import { useState, useEffect } from 'react';
import { TrackerNavigator } from './TrackerNavigator';
import { TrackerTable } from './TrackerTable';

export const EncounterTracker = ({ chars, activeEncounter = {} }) => {
  const [numRounds, setNumRounds] = useState(6);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [encounterLog, setEncounterLog] = useState([]);

  // Initialize encounterLog
  useEffect(() => {}, [chars, numRounds]);

  const addRound = () => {
    const logCopy = JSON.parse(JSON.stringify(encounterLog));

    const lastRound = logCopy.pop();
    lastRound.round++;

    lastRound.turns.forEach(turn => (turn.statuses = []));

    setEncounterLog([...encounterLog, lastRound]);
  };

  return (
    <>
      {activeEncounter && (
        <>
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
        </>
      )}
    </>
  );
};
