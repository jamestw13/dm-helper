const { rand, randNumber, randHex, randFullName, randBoolean } = require('@ngneat/falso');

const alignments = [
  'Lawful Good',
  'Lawful Neutral',
  'Lawful Evil',
  'Neutral Good',
  'True Neutral',
  'Neutral Evil',
  'Chaotic Good',
  'Chaotic Neutral',
  'Chaotic Evil',
];

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
  {
    type: 'Dwarf',
    abScoreIncrease: ['conMod + 2'],
    age: randNumber({ min: 30, max: 400 }),
    size: 'medium',
    speed: '25ft',
    alignment: rand(alignments),
    languages: ['Common', 'Dwarvish'],
    subraces: [{}],
  },
  {
    type: 'Dragonborn',
    abScoreIncrease: [],
    age: 25,
    size: 'medium',
    speed: '25ft',
    alignment: rand(alignments),
    languages: [],
    subraces: [],
  },
  {
    type: 'Elf',
    abScoreIncrease: [],
    age: 25,
    size: 'medium',
    speed: '25ft',
    alignment: rand(alignments),
    languages: [],
    subraces: [],
  },
  {
    type: 'Halfling',
    abScoreIncrease: [],
    age: 25,
    size: 'medium',
    speed: '25ft',
    alignment: rand(alignments),
    languages: [],
    subraces: [],
  },
  {
    type: 'Gnome',
    abScoreIncrease: [],
    age: 25,
    size: 'medium',
    speed: '25ft',
    alignment: rand(alignments),
    languages: [],
    subraces: [],
  },
  {
    type: 'Half-Elf',
    abScoreIncrease: [],
    age: 25,
    size: 'medium',
    speed: '25ft',
    alignment: rand(alignments),
    languages: [],
    subraces: [],
  },
  {
    type: 'Half-Orc',
    abScoreIncrease: [],
    age: 25,
    size: 'medium',
    speed: '25ft',
    alignment: rand(alignments),
    languages: [],
    subraces: [],
  },
  {
    type: 'Human',
    abScoreIncrease: [],
    age: 25,
    size: 'medium',
    speed: '25ft',
    alignment: rand(alignments),
    languages: [],
    subraces: [],
  },
  {
    type: 'Tiefling',
    abScoreIncrease: [],
    age: 25,
    size: 'medium',
    speed: '25ft',
    alignment: rand(alignments),
    languages: [],
    subraces: [],
  },
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

const getHP = (_level, _hitDice, _conMod) => {
  let result = 0;

  for (let i = _level; i > 0; i--) {
    if (i === 1) {
      result += _hitDice + _conMod;
    } else {
      result += randNumber({ min: 1, max: _hitDice }) + _conMod;
    }
  }
  return result;
};

const rollDie = numSides => {
  return randNumber({ min: 1, max: numSides });
};

module.exports = function generateCharacter(isNPC) {
  const scores = rollAbilityScores();
  const level = randNumber({ min: 1, max: 3 });

  const raceStats = rand(races);
  const classStats = rand(classes);
  const backgroundStats = rand(backgrounds);

  const character = {
    name: randFullName({ withAccents: true }),
    race: raceStats.type,
    class: classStats.type,
    hitDice: classStats.hitDice,
    level: level,
    alignment: rand(alignments),
    background: backgroundStats.type,
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

    ac: 10 + getAbilityMod(scores[1]) + randNumber({ min: -2, max: 4 }),
    speed: '30ft',
    maxHP: getHP(level, classStats.hitDice, getAbilityMod(scores[2])),
    currentHP: getHP(level, classStats.hitDice, getAbilityMod(scores[2])),
    tempHP: randNumber({ min: 0, max: 3 }),
    totalHD: `${level}d${classStats.hitDice}`,
    currentHD: `${level}d${classStats.hitDice}`,
    inspiration: randNumber({ min: 0, max: 1 }),

    atkName: 'Unarmed Strike',
    atkBonus: getAbilityMod(scores[0]),
    atkDamType: '1d4 B',

    copperP: randNumber({ min: 0, max: 10 }),
    silverP: randNumber({ min: 0, max: 10 }),
    electrumP: 0,
    goldP: randNumber({ min: 0, max: 10 }),
    platinumP: 0,
    equipmentNotes: '50ft of Hemp Rope',
    persTraits: '',
    ideals: '',
    bonds: '',
    flaws: '',
    fsAndTs: '',
    otherProfs: '',
    passPercep: getAbilityMod(scores[4]),
    strSTProf: randBoolean(),
    dexSTProf: randBoolean(),
    conSTProf: randBoolean(),
    intSTProf: randBoolean(),
    wisSTProf: randBoolean(),
    chaSTProf: randBoolean(),
    strSTmod: 0,
    dexSTmod: 0,
    conSTmod: 0,
    intSTmod: 0,
    wisSTmod: 0,
    chaSTmod: 0,
    skillAcrobatics: 0,
    skillAniHand: 0,
    skillArcana: 0,
    skillAth: 0,
    skillDecep: 0,
    skillHist: 0,
    skillInsight: 0,
    skillIntim: 0,
    skillInvest: 0,
    skillMedicine: 0,
    skillNature: 0,
    skillPercep: 0,
    skillPerform: 0,
    skillPersuasion: 0,
    skillReligion: 0,
    skillSleightHand: 0,
    skillStealth: 0,
    skillSurvival: 0,

    skillProfAcrobatics: randBoolean(),
    skillProfAniHand: randBoolean(),
    skillProfArcana: randBoolean(),
    skillProfAth: randBoolean(),
    skillProfDecep: randBoolean(),
    skillProfHist: randBoolean(),
    skillProfInsight: randBoolean(),
    skillProfIntim: randBoolean(),
    skillProfInvest: randBoolean(),
    skillProfMedicine: randBoolean(),
    skillProfNature: randBoolean(),
    skillProfPercep: randBoolean(),
    skillProfPerform: randBoolean(),
    skillProfPersuasion: randBoolean(),
    skillProfReligion: randBoolean(),
    skillProfSleightHand: randBoolean(),
    skillProfStealth: randBoolean(),
    skillProfSurvival: randBoolean(),

    primaryColor: randHex(),
    secondaryColor: randHex(),
    isNPC: isNPC,
    autogenerated: true,
  };

  return character;
};
