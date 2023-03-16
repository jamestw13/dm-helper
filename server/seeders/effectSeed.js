import { rand, randNumber, randText } from '@ngneat/falso';

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

const generateEffect = chars => {
  const startRound = randNumber({ min: 0, max: 4 });
  const endRound = startRound + randNumber({ min: 1, max: 3 });
  const turn = randNumber({ min: 0, max: chars.length });
  const effect = {
    caster: rand(chars),
    target: rand(chars),
    effectName: rand(conditions),
    effectDescription: randText({ charCount: 20 }),
    startRound: startRound,
    startTurn: turn,
    endRound: endRound,
    endTurn: turn,
  };

  // const effect = {
  //   target: rand(characterData),
  //   caster: rand(characterData),
  //   condition: rand(conditions),
  //   startRound: randNumber({ min: 0, max: 6 }),
  //   startTurn: randNumber({ min: 0, max: characterData.length }),
  //   duration: randNumber({ min: 1, max: 4 }),
  //   durationUnit: rand(['round', 'turn']),
  // };
  // statusData.push(status);

  return effect;
};

export default generateEffect;
