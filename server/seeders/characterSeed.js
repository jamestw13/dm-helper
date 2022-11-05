const {
  rand,
  randNumber,
  randBoolean,
  randHex,
  randFullName,
} = require('@ngneat/falso');

const classes = [
  { type: 'Barbarian', hitDice: 12 },
  { type: 'Bard', hitDice: 8 },
  { type: 'Cleric', hitDice: 8 },
  { type: 'Druid', hitDice: 8 },
  { type: 'Fighter', hitDice: 10 },
  { type: 'Monk', hitDice: 8 },
  { type: 'Paladin', hitDice: 10 },
  { type: 'Ranger', hitDice: 10 },
  { type: 'Rogue', hitDice: 8 },
  { type: 'Sorcerer', hitDice: 6 },
  { type: 'Warlock', hitDice: 10 },
  { type: 'Wizard', hitDice: 6 },
];

const races = [
  { type: 'Human' },
  { type: 'Elf' },
  { type: 'Dwarf' },
  { type: 'Halfling' },
  { type: 'Dragonborn' },
  { type: 'Gnome' },
  { type: 'Half-elf' },
  { type: 'Half-orc' },
  { type: 'Tiefling' },
  { type: 'Warforged' },
];

const backgrounds = [
  { type: 'Acolyte' },
  { type: 'Charlatan' },
  { type: 'Criminal' },
  { type: 'Entertainer' },
  { type: 'Folk Hero' },
  { type: 'Guild Artisan' },
  { type: 'Hermit' },
  { type: 'Noble' },
  { type: 'Outlander' },
  { type: 'Sage' },
  { type: 'Sailor' },
  { type: 'Soldier' },
  { type: 'Urchin' },
];

const rollAbilityScores = () => {
  let scores = [];
  let rollArray = [1, 1, 1, 1];

  for (let i = 0; i < 6; i++) {
    rolls = rollArray.map(roll => {
      return randNumber({ min: 1, max: 6 });
    });
    rolls.sort((a, b) => b - a).pop();

    scores.push(rolls.reduce((acc, i) => acc + i));
  }
  return scores;
};

const getAbilityMod = stat => {
  return Math.floor((stat - 10) / 2);
};

const getHP = () => {
  let result = 0;

  for (let i = this.level; i > 0; i--) {
    if (i === 1) {
      result += this.class.hitDice + this.conMod;
    } else {
      result += randNumber({ min: 1, max: this.class.hitDice }) + this.conMod;
    }
  }
  return result;
};

const rollDie = numSides => {
  return randNumber({ min: 1, max: numSides });
};

module.exports = function generateCharacters(numChars) {
  let charData = [];

  for (let i = 0; i < numChars; i++) {
    const scores = rollAbilityScores();
    const level = randNumber({ min: 1, max: 20 });

    const character = {
      name: randFullName({ withAccents: true }),
      race: rand(races),
      class: rand(classes),
      level: level,
      background: rand(backgrounds),
      str: scores[0],
      dex: scores[1],
      con: scores[2],
      int: scores[3],
      wis: scores[4],
      cha: scores[5],
      strMod: getAbilityMod(scores[0]),
      dexMod: getAbilityMod(scores[1]),
      conMod: getAbilityMod(scores[2]),
      intMod: getAbilityMod(scores[3]),
      wisMod: getAbilityMod(scores[4]),
      chaMod: getAbilityMod(scores[5]),
      profBonus: Math.floor(level / 4) + 2,
      initMod: getAbilityMod(scores[1]),
      init: rollDie(20) + getAbilityMod(scores[3]),
      hp: getHP(),
      ac: 10 + getAbilityMod(scores[1]) + randNumber({ min: -2, max: 4 }),

      color: randHex(),
      isNPC: randBoolean(),
    };

    charData.push(character);
  }
  return charData;
};
