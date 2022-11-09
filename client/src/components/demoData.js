import {
  rand,
  seed,
  incrementalNumber,
  randNumber,
  randBoolean,
  randFirstName,
  randHex,
  randFullName,
} from '@ngneat/falso';
import { v4 as uuidv4 } from 'uuid';

const NUM_CHARS = 7;
const NUM_STATUSES = 10;

seed('D&D');

class Character {
  constructor() {
    this.id = uuidv4();
    this.name = randFirstName({ withAccents: true });
    this.race = rand(this.races);
    this.class = rand(this.classes);
    this.level = randNumber({ min: 1, max: 5 });
    this.background = rand(this.backgrounds);
    this.str = this.rollAbilityScore();
    this.dex = this.rollAbilityScore();
    this.con = this.rollAbilityScore();
    this.int = this.rollAbilityScore();
    this.wis = this.rollAbilityScore();
    this.cha = this.rollAbilityScore();
    this.strMod = this.getAbilityMod(this.str);
    this.dexMod = this.getAbilityMod(this.dex);
    this.conMod = this.getAbilityMod(this.con);
    this.intMod = this.getAbilityMod(this.int);
    this.wisMod = this.getAbilityMod(this.wis);
    this.chaMod = this.getAbilityMod(this.cha);
    this.profBonus = Math.floor(this.level / 4) + 2;
    this.initMod = this.dexMod;
    this.init = this.rollDie(20) + this.intMod;
    this.hp = this.getHP();
    this.ac = 10 + this.dexMod + randNumber({ min: -2, max: 4 });
    this.inEncounter = randBoolean();
    this.viewSheet = randBoolean();
    this.color = randHex();
    this.isNPC = randBoolean();
    this.player = randFullName();
  }

  rollAbilityScore = () => {
    let rolls = [1, 1, 1, 1];
    rolls = rolls.map(roll => {
      return randNumber({ min: 1, max: 6 });
    });
    rolls.sort((a, b) => b - a).pop();
    const result = rolls.reduce((acc, i) => acc + i);
    return result;
  };

  getAbilityMod = stat => {
    return Math.floor((stat - 10) / 2);
  };

  getHP = () => {
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

  rollDie = numSides => {
    return randNumber({ min: 1, max: numSides });
  };
  classes = [
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

  races = [
    'Human',
    'Elf',
    'Dwarf',
    'Halfling',
    'Dragonborn',
    'Gnome',
    'Half-elf',
    'Half-orc',
    'Tiefling',
    'Warforged',
  ];

  backgrounds = [
    'Acolyte',
    'Charlatan',
    'Criminal',
    'Entertainer',
    'Folk Hero',
    'Guild Artisan',
    'Hermit',
    'Noble',
    'Outlander',
    'Sage',
    'Sailor',
    'Soldier',
    'Urchin',
  ];
}
export const generateCharData = numChars => {
  let chars = [];
  const idFactory = incrementalNumber({ from: 20, to: 1000, step: 1 });
  for (let i = 0; i < numChars; i++) {
    chars.push(new Character(idFactory()));
  }
  return chars;
};

const generateStatusData = numStatuses => {
  let statusData = [];
  for (let i = 0; i < numStatuses; i++) {
    const targetChar = rand(characterData);
    const status = {
      target: targetChar.name,
      targetColor: targetChar.color,
      caster: rand(characterData.map(char => char.name)),
      condition: rand(conditions),
      startRound: randNumber({ min: 0, max: 6 }),
      startTurn: randNumber({ min: 0, max: NUM_CHARS }),
      duration: randNumber({ min: 1, max: 20 }),
    };
    statusData.push(status);
  }
  return statusData;
};

const conditions = [
  'Blinded',
  'Charmed',
  'Deafened',
  'Frightened',
  'Grappled',
  'Incapacitated',
  'Invisible',
  'Paralyzed',
  'Petrified',
  'Poisoned',
  'Prone',
  'Restrained',
  'Stunned',
  'Unconscious',
];

export const characterData = generateCharData(NUM_CHARS);
export const statuses = generateStatusData(NUM_STATUSES);
