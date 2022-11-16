const db = require('../config/connection');
const { User, Character, Campaign } = require('../models');
const generateUsers = require('./userSeed');
const generateCharacter = require('./characterSeed');
const { rand, randBook, randNumber, randBoolean } = require('@ngneat/falso');

const NUM_USERS = 20;
const NUM_CAMPAIGNS = 20;
const NUM_PLAYERS = 8 * NUM_CAMPAIGNS;

db.once('open', async () => {
  // Clear previous documents
  await User.deleteMany({});
  await Character.deleteMany({});
  await Campaign.deleteMany({});

  // Make pool of users
  const users = await User.create(await generateUsers(NUM_USERS));

  // DM Round
  for (let i = 0; i < NUM_CAMPAIGNS; i++) {
    // Select random user to be a DM
    const { _id: dmId } = rand(users);

    // Create campaign
    const { _id: campaignId } = await Campaign.create({
      owner: dmId,
      name: randBook().title,
    });

    // Assign campaign to user
    const updatedDM = await User.findOneAndUpdate(
      { _id: dmId },
      { $addToSet: { campaigns: campaignId } }
    );

    // NPC Loop
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

  // PC Round
  const campaigns = await Campaign.find({});

  for (let i = 0; i < NUM_PLAYERS; i++) {
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
        { $addToSet: { characters: pcId } },
        { $addToSet: { players: playerId } }
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
  console.log('Finished Seeding');
  process.exit(0);
});
