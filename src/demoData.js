import {
  rand,
  seed,
  incrementalNumber,
  randNumber,
  randBoolean,
  randFirstName,
  randHex,
  randFullName,
} from "@ngneat/falso";

const NUM_CHARS = 7;
const NUM_STATUSES = 10;

seed("TJ");

const rollStat = () => {
  let rolls = [1, 1, 1, 1];
  rolls = rolls.map((roll) => {
    return randNumber({ min: 1, max: 6 });
  });
  rolls.sort((a, b) => b - a).pop();
  const result = rolls.reduce((acc, i) => acc + i);
  return result;
};
rollStat();

class Character {
  constructor(id) {
    this.id = id;
    this.name = randFirstName({ withAccents: true });
    this.race = rand(races);
    this.class = rand(classes);
    this.level = randNumber({ min: 1, max: 5 });
    this.str = rollStat();
    this.dex = rollStat();
    this.con = rollStat();
    this.int = rollStat();
    this.wis = rollStat();
    this.cha = rollStat();
    this.init = randNumber({ min: -5, max: 5 });
    this.hp = randNumber({ min: 0, max: 35 });
    this.ac = randNumber({ min: -5, max: 5 });
    this.inEncounter = randBoolean();
    this.viewSheet = randBoolean();
    this.color = randHex();
    this.isNPC = randBoolean();
    this.player = randFullName();
  }
}
export const generateCharData = (numChars) => {
  let chars = [];
  const idFactory = incrementalNumber({ from: 20, to: 1000, step: 1 });
  for (let i = 0; i < numChars; i++) {
    chars.push(new Character(idFactory()));
  }
  return chars;
};

const generateStatusData = (numStatuses) => {
  let statusData = [];
  for (let i = 0; i < numStatuses; i++) {
    const targetChar = rand(characterData);
    const status = {
      target: targetChar.name,
      targetColor: targetChar.color,
      caster: rand(characterData.map((char) => char.name)),
      condition: rand(conditions),
      startRound: randNumber({ min: 0, max: 6 }),
      startTurn: randNumber({ min: 0, max: NUM_CHARS }),
      duration: randNumber({ min: 1, max: 20 }),
    };
    statusData.push(status);
  }
  return statusData;
};

const races = [
  "Human",
  "Elf",
  "Dwarf",
  "Halfling",
  "Dragonborn",
  "Gnome",
  "Half-elf",
  "Half-orc",
  "Tiefling",
  "Warforged",
];
const classes = [
  "Barbarian",
  "Bard",
  "Cleric",
  "Druid",
  "Fighter",
  "Monk",
  "Paladin",
  "Ranger",
  "Rogue",
  "Sorcerer",
  "Warlock",
  "Wizard",
];

const conditions = [
  "Blinded",
  "Charmed",
  "Deafened",
  "Frightened",
  "Grappled",
  "Incapacitated",
  "Invisible",
  "Paralyzed",
  "Petrified",
  "Poisoned",
  "Prone",
  "Restrained",
  "Stunned",
  "Unconscious",
];

export const characterData = generateCharData(NUM_CHARS);
export const statuses = generateStatusData(NUM_STATUSES);
