const { randUser, randAvatar } = require('@ngneat/falso');

const generateCharacters = require('./characterSeed');
const { Character } = require('../models');

module.exports = async function generateUsers(numUsers) {
  let userData = [];

  for (let i = 0; i < numUsers; i += 1) {
    const userStats = randUser();

    const user = {
      username: userStats.username,
      email: userStats.email,
      firstname: userStats.firstName,
      lastname: userStats.lastName,
      password: 11111111,
      avatar: randAvatar(),
    };

    userData.push(user);
  }

  return userData;
};
