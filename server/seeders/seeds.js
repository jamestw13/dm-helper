const db = require('../config/connection');
const { User, Character, Campaign, Encounter } = require('../models');
const generateUsers = require('./userSeed');
const generateCharacter = require('./characterSeed');
const {
  seed,
  rand,
  randBook,
  randNumber,
  randBoolean,
} = require('@ngneat/falso');
const Monster = require('../models/Monster');
const seedMonsters = require('./monsterSeed');
const generateStatusData = require('./statusSeed');

const NUM_USERS = 20;
const NUM_CAMPAIGNS = 20;
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
      name: randBook().title,
    });

    // Assign campaign to user
    await User.findOneAndUpdate(
      { _id: dmId },
      { $addToSet: { campaigns: campaignId } }
    );

    // Popualte campaign with NPCs
    for (let j = 0; j < randNumber({ min: 0, max: 7 }); j++) {
      // Create NPC
      const { _id: npcId } = await Character.create(generateCharacter(true));

      // Connect NPC with DM
      await User.findOneAndUpdate(
        { _id: dmId },
        { $addToSet: { characters: npcId } }
      );

      // Connect NPC with campaign
      await Campaign.findOneAndUpdate(
        { _id: campaignId },
        { $addToSet: { characters: npcId } }
      );

      await Character.findOneAndUpdate(
        { _id: npcId },
        { campaign: campaignId, user: dmId }
      );
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
    await User.findOneAndUpdate(
      { _id: playerId },
      { $addToSet: { characters: pcId } }
    );

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
      await Campaign.findOneAndUpdate(
        { _id: campaign._id },
        { $addToSet: { characters: pcId, players: playerId } }
      );

      await Character.findOneAndUpdate(
        { _id: pcId },
        { campaign: campaign._id }
      );

      await User.findOneAndUpdate(
        { _id: playerId },
        { $addToSet: { campaigns: campaign._id } }
      );
    }
  }

  // Create Encounters

  for (campaign of campaigns) {
    // randomly set num of encounters in campaign
    const numEncounters = randNumber({ min: 1, max: 3 });

    for (let i = 0; i < numEncounters; i++) {
      if (campaign.characters?.length > 0) {
        let encounterCharacters = [...campaign.characters];
        // // randomly pick characters to be in encounter
        // encounterCharacters = campaign.characters.filter(character =>
        //   randBoolean()
        // );
        let chars;
        if (encounterCharacters.length > 1) {
          // for (char of encounterCharacters) {
          chars = await Character.find({ _id: encounterCharacters });
          chars = chars.sort((a, b) => {
            const bNum = b.initMod + randNumber({ min: 1, max: 20 });
            const aNum = a.initMod + randNumber({ min: 1, max: 20 });

            return bNum - aNum;
          });

          const data = [
            ...Array(randNumber({ min: NUM_ROUNDS, max: NUM_ROUNDS + 5 })),
          ].map((round, i) => {
            return {
              round: i,
              turns: chars?.map((char, j) => {
                return {
                  turn: j + 1,
                  character: char,
                  statuses: generateStatusData(encounterCharacters).filter(
                    status => {
                      return (
                        status.startRound === i &&
                        status.startTurn === j &&
                        encounterCharacters.filter(
                          char => char.name === status.target
                        ).length
                      );
                    }
                  ),
                };
              }),
            };
          });

          const encounter = await Encounter.create({
            title: `${campaign.name} - ${i + 1}`,
            characters: [...encounterCharacters],
            encounterLog: data,
          });

          await Campaign.findOneAndUpdate(
            { _id: campaign._id },
            { $addToSet: { encounters: encounter } }
          );
        }
      }
    }
  }
  console.log('Finished Seeding');
  process.exit(0);
});
