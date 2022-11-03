import {
  rand,
  seed,
  incrementalNumber,
  randNumber,
  randBoolean,
  randFirstName,
} from "@ngneat/falso";

export const generateCharData = (numChars) => {
  seed("d&d");
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
    };

    chars.push(char);
  }
  return chars;
};

export const characterData = generateCharData(7);

export const statuses = [
  {
    target: "Jean",
    name: "Stone Skin",
    startRound: 2,
    startTurn: 1,
    caster: "Jean",
    duration: 4,
  },
  {
    target: "George",
    name: "stunned",
    startRound: 1,
    startTurn: 1,
    caster: "Jean",
    duration: 3,
  },
  {
    target: "George",
    name: "Flat-footed",
    startRound: 2,
    startTurn: 0,
    caster: "Jean",
    duration: 1,
  },
];

export const charData = [
  {
    id: 12,
    name: "George",
    race: "Dwarf",
    class: "Barbarian",
    level: 3,
    hp: 11,
    ac: 24,
    init: 4,
    dex: 1,
    inEncounter: true,
    viewSheet: false,
  },
  {
    id: 13,
    name: "Jean",
    race: "Human",
    class: "Wizard",
    level: 3,
    init: 2,
    dex: 2,
    hp: 23,
    ac: 4,
    inEncounter: false,
    viewSheet: true,
  },
  {
    id: 14,
    name: "Allyon",
    race: "Warforged",
    class: "Artificer",
    level: 3,
    init: 3,
    dex: 3,
    hp: 1,
    ac: 32,
    inEncounter: false,
    viewSheet: false,
  },
  {
    id: 15,
    name: "Jerk",
    race: "Jerk",
    class: "Jerk",
    level: 2,
    init: -1,
    dex: 4,
    hp: 44,
    ac: 13,
    inEncounter: true,
    viewSheet: true,
  },
];
