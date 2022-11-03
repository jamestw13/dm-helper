import {
  rand,
  seed,
  incrementalNumber,
  randNumber,
  randBoolean,
  randFirstName,
  randSuperheroName,
  randColor,
  randHex,
} from "@ngneat/falso";

const NUM_CHARS = 7;
const NUM_STATUSES = 10;

seed("d&d");
export const generateCharData = (numChars) => {
  let chars = [];
  const idFactory = incrementalNumber({ from: 20, to: 1000, step: 1 });
  for (let i = 0; i < numChars; i++) {
    const char = {
      id: idFactory(),
      name: randFirstName({ withAccents: true }),
      race: rand([
        "human",
        "elf",
        "dwarf",
        "halfling",
        "dragonborn",
        "gnome",
        "half-elf",
        "half-orc",
        "tiefling",
        "warforged",
      ]),
      class: rand([
        "barbarian",
        "bard",
        "cleric",
        "druid",
        "fighter",
        "monk",
        "paladin",
        "ranger",
        "rogue",
        "sorcerer",
        "warlock",
        "wizard",
      ]),
      level: randNumber({ min: 1, max: 5 }),
      init: randNumber({ min: -5, max: 5 }),
      dex: randNumber({ min: -5, max: 5 }),
      hp: randNumber({ min: 0, max: 35 }),
      ac: randNumber({ min: -5, max: 5 }),
      inEncounter: randBoolean(),
      viewSheet: randBoolean(),
      color: randHex(),
      isNPC: randBoolean(),
    };

    chars.push(char);
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
      condition: randSuperheroName({ withAccents: true }),
      startRound: randNumber({ min: 0, max: 6 }),
      startTurn: randNumber({ min: 0, max: NUM_CHARS }),
      duration: randNumber({ min: 1, max: 20 }),
    };
    statusData.push(status);
  }
  return statusData;
};

export const characterData = generateCharData(NUM_CHARS);
export const statuses = generateStatusData(NUM_STATUSES);
