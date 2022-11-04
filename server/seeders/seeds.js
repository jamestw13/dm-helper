const { randUserName, randEmail } = require('@ngneat/falso');

const db = require('../config/connection');
const { User } = require('../models');

const NUM_USERS = 3;

db.once('open', async () => {
  await User.deleteMany({});

  // create user data
  const userData = [];

  for (let i = 0; i < NUM_USERS; i += 1) {
    const username = randUserName();
    const email = randEmail(username);
    const password = 11111111;

    userData.push({ username, email, password });
  }

  const createdUsers = await User.collection.insertMany(userData);

  console.log('Finished Seeding');
  process.exit(0);
});
