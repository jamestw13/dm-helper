const { randUserName, randEmail, randNumber } = require('@ngneat/falso');

const generateCharacters = require('./characterSeed');
const { Character } = require('../models');

module.exports = async function generateUsers(numUsers) {
  let userData = [];

  for (let i = 0; i < numUsers; i += 1) {
    const user = {
      username: randUserName(),
      email: randEmail(),
      password: 11111111,
    };

    userData.push(user);
  }

  return userData;
};
