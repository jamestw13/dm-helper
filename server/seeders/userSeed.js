const { randUserName, randEmail, randNumber } = require('@ngneat/falso');

const generateCharacters = require('./characterSeed');
const { Character } = require('../models');

module.exports = async function generateUsers(numUsers) {
  const numChars = randNumber({ min: 0, max: 5 });

  let userData = [];

  for (let i = 0; i < numUsers; i += 1) {
    const chars = generateCharacters(numChars);
    let charObs = await Character.create(chars);
    charObs = charObs.map(char => char._id);
    console.log('await result: ', charObs);

    const user = {
      username: randUserName(),
      email: randEmail(),
      password: 11111111,
      characters: chars,
    };

    userData.push(user);
  }

  return userData;
};
