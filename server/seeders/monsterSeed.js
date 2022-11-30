const Monster = require('../models/Monster');

module.exports = async function seedMonsters() {
  const bugBear = {
    name: 'Bugbear',
    size: 'Medium',
    type: 'Humanoid (Goblinoid)',
    alignment: 'Chaotic Evil',
    ac: 16,
    hp: 27,
    speed: '30 ft.',
    str: 15,
    dex: 14,
    con: 13,
    int: 8,
    wis: 11,
    cha: 9,
    strMod: 2,
    dexMod: 2,
    conMod: 1,
    intMod: -1,
    wisMod: 0,
    chaMod: -1,
  };

  try {
    await Monster.create(bugBear);
    console.log('added bugBear');
  } catch (err) {
    console.log(err);
  }
};
