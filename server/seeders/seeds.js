const db = require('../config/connection');
const { User, Character } = require('../models');
const generateUsers = require('./userSeed');

const NUM_USERS = 5;
const NUM_CHARS = 15;

db.once('open', async () => {
  // Clear previous documents
  await User.deleteMany({});
  await Character.deleteMany({});

  await User.create(await generateUsers(NUM_USERS));

  console.log('Finished Seeding');
  process.exit(0);
});
