import { useState, useEffect } from "react";
import { TrackerNavigator } from "./TrackerNavigator";
import { TrackerTable } from "./TrackerTable";
import { statuses } from "./demoData";

export const EncounterTracker = ({ chars }) => {
  const [numRounds, setNumRounds] = useState(6);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [encounterLog, setEncounterLog] = useState([]);

  useEffect(() => {
    const data = [...Array(numRounds + 1)].map((round, i) => {
      const activeChars = chars?.filter((char) => !!char.inEncounter);
      return {
        round: i,
        turns: activeChars?.map((char, j) => {
          return {
            j,
            char,
            statuses: statuses.filter((status) => {
              return (
                status.startRound === i &&
                status.startTurn === j &&
                activeChars.filter((char) => char.name === status.target).length
              );
            }),
          };
        }),
      };
    });
    setEncounterLog(data);
  }, [chars, numRounds]);

  return (
    <div id="tracker">
      <h2>Encounter</h2>
      <TrackerNavigator
        numRounds={numRounds}
        setNumRounds={setNumRounds}
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
      />
    </div>
  );
};
