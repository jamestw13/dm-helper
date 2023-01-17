const db = require('../config/connection');
const { User, Character, Campaign, Encounter } = require('../models');
const { generateUsers, linkFriends } = require('./userSeed');
const generateCharacter = require('./characterSeed');
const {
  seed,
  rand,
  randBook,
  randNumber,
  randBoolean,
  randParagraph,
  randTextRange,
  randText,
} = require('@ngneat/falso');
const Monster = require('../models/Monster');
const seedMonsters = require('./monsterSeed');
const generateEffect = require('./effectSeed');

const NUM_USERS = 20;
const NUM_CAMPAIGNS = 12;
const NUM_PCS = 6 * NUM_CAMPAIGNS;
const NUM_ROUNDS = 6;

db.once('open', async () => {
  // Clear previous documents
  await User.deleteMany({});
  await Character.deleteMany({});
  await Campaign.deleteMany({});
  await Monster.deleteMany({});
  await Encounter.deleteMany({});

  // seed('Stat Block');

  seedMonsters();

  // Make pool of users
  const users = await User.create(await generateUsers(NUM_USERS));

  // Make campaigns
  for (let i = 0; i < NUM_CAMPAIGNS; i++) {
    // Select random user to be a DM
    const { _id: dmId } = rand(users);

    // Create campaign
    const { _id: campaignId } = await Campaign.create({
      owner: dmId,
      name: randTextRange({ min: 15, max: 30 }),
    });

    // Assign campaign to user
    await User.findOneAndUpdate({ _id: dmId }, { $addToSet: { campaigns: campaignId } });

    // Populate campaign with NPCs
    for (let j = 0; j < randNumber({ min: 0, max: 7 }); j++) {
      // Create NPC
      const { _id: npcId } = await Character.create(generateCharacter(true));

      // Connect NPC with DM
      await User.findOneAndUpdate({ _id: dmId }, { $addToSet: { characters: npcId } });

      // Connect NPC with campaign
      await Campaign.findOneAndUpdate({ _id: campaignId }, { $addToSet: { characters: npcId } });

      await Character.findOneAndUpdate({ _id: npcId }, { campaign: campaignId, user: dmId });
    }
  }

  const campaigns = await Campaign.find({});

  // Populate campaign with players and their PCs
  for (let i = 0; i < NUM_PCS; i++) {
    // Select random user to be a player
    const { _id: playerId } = rand(users);

    // Create PC
    const { _id: pcId } = await Character.create(generateCharacter(false));

    // Associate PC with user
    await User.findOneAndUpdate({ _id: playerId }, { $addToSet: { characters: pcId } });

    await Character.findOneAndUpdate({ _id: pcId }, { user: playerId });

    // Randomly select whether to associate with the campaign and do so
    if (randBoolean()) {
      //  Select random campaign where user is not DM
      let dmId = playerId;
      let campaign;

      while (dmId === playerId) {
        campaign = rand(campaigns);
        dmId = campaign.owner._id;
      }

      // Associate character and campaign
      await Campaign.findOneAndUpdate({ _id: campaign._id }, { $addToSet: { characters: pcId, players: playerId } });

      await Character.findOneAndUpdate({ _id: pcId }, { campaign: campaign._id });

      await User.findOneAndUpdate({ _id: playerId }, { $addToSet: { campaigns: campaign._id } });
    }
  }

  // Create Encounters
  const encounterCampaigns = await Campaign.find({});
  for (let campaign of encounterCampaigns) {
    // skip if campaign has less than two characters
    if (campaign.characters?.length < 2) {
      break;
    }

    // randomly set num of encounters in campaign
    const numEncounters = randNumber({ min: 1, max: 4 });

    for (let i = 0; i < numEncounters; i++) {
      // create the encounter object
      const encounter = await Encounter.create({
        title: randBook().title,
        characters: [],
        progress: i === 0 ? 'active' : 'not started',
        description: randParagraph(),
        // encounterLog: data,
      });

      // add encounter to campaign
      await Campaign.findOneAndUpdate({ _id: campaign._id }, { $addToSet: { encounters: encounter } });

      // add first two characters and flip coins for remaining chars
      const encounterCharacters = await campaign.characters.filter((character, i) => i < 2 || randBoolean());

      encounterCharacters.forEach(async character => {
        const char = await Character.findOne({ _id: character }).select('initMod');

        const initiative = char.initMod + randNumber({ min: 1, max: 20 });

        await Encounter.updateOne({ _id: encounter }, { $addToSet: { characters: { character, initiative } } });
      });

      // add effects
      for (let i = 0; i < randNumber({ min: 3, max: 6 }); i++) {
        const encChars = await Encounter.findOne({ _id: encounter }).select('characters');
        const chars = encChars.characters.map(char => char.character);
        const effect = generateEffect(chars);

        await Encounter.updateOne(
          { _id: encounter },
          {
            $addToSet: {
              effects: effect,
            },
          }
        );
      }
    }
  }

  // Link Friends

  const friendPool = await User.find({}).select('_id');

  // Randomize friends
  for (let i = 0; i < NUM_USERS * 2; i++) {
    let friend1 = rand(friendPool);
    let friend2 = friend1;

    while (friend1 === friend2) {
      friend2 = rand(friendPool);
    }

    await linkFriends(friend1, friend2);
  }

  // Campaign friends
  const friendlyCampaigns = await Campaign.find({}).select('players');

  for (let campaign of friendlyCampaigns) {
    for (let player1 of campaign.players) {
      for (let player2 of campaign.players) {
        await linkFriends(player1, player2);
      }
    }
  }

  await console.log('Finished Seeding');
  process.exit(0);
});
