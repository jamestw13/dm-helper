const { rand, randNumber, randBoolean } = require('@ngneat/falso');

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

const generateStatusData = characterData => {
  let statusData = [];
  const roll = randNumber({ min: 1, max: 20 });
  if (roll >= 1) {
    const status = {
      target: rand(characterData),
      caster: rand(characterData),
      condition: rand(conditions),
      startRound: randNumber({ min: 0, max: 6 }),
      startTurn: randNumber({ min: 0, max: characterData.length }),
      duration: randNumber({ min: 1, max: 4 }),
      durationUnit: rand(['round', 'turn']),
    };
    statusData.push(status);
  }
  return statusData;
};

module.exports = generateStatusData;
