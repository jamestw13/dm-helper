import { useState, useEffect } from 'react';
import { TrackerNavigator } from './TrackerNavigator';
import { TrackerTable } from './TrackerTable';
import { statuses } from './demoData';

export const EncounterTracker = ({ chars }) => {
  const [numRounds, setNumRounds] = useState(6);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [encounterLog, setEncounterLog] = useState([]);

  // Initialize encounterLog
  useEffect(() => {
    let activeChars = chars?.filter(char => !!char.inEncounter);
    activeChars = activeChars.sort((a, b) => b.init - a.init);
    const data = [...Array(numRounds + 1)].map((round, i) => {
      return {
        round: i,
        turns: activeChars?.map((char, j) => {
          return {
            j,
            char,
            statuses: statuses.filter(status => {
              return (
                status.startRound === i &&
                status.startTurn === j &&
                activeChars.filter(char => char.name === status.target).length
              );
            }),
          };
        }),
      };
    });
    setEncounterLog(data);
  }, [chars, numRounds]);

  const addRound = () => {
    const logCopy = JSON.parse(JSON.stringify(encounterLog));

    const lastRound = logCopy.pop();
    lastRound.round++;

    lastRound.turns.forEach(turn => (turn.statuses = []));

    setEncounterLog([...encounterLog, lastRound]);
  };

  return (
    <div id='tracker' className='card'>
      <h2>Encounter</h2>
      <TrackerNavigator
        currentRound={currentRound}
        setCurrentRound={setCurrentRound}
        currentTurn={currentTurn}
        setCurrentTurn={setCurrentTurn}
      />

      <TrackerTable
        currentRound={currentRound}
        setCurrentRound={setCurrentRound}
        currentTurn={currentTurn}
        setCurrentTurn={setCurrentTurn}
        encounterLog={encounterLog}
        setEncounterLog={setEncounterLog}
        addRound={addRound}
      />
    </div>
  );
};
