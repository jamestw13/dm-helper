import { useState } from "react";
import { TrackerNavigator } from "./TrackerNavigator";
import { TrackerTable } from "./TrackerTable";

export const EncounterTracker = ({ chars }) => {
  const [numRounds, setNumRounds] = useState(12);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentInit, setCurrentInit] = useState(30);

  return (
    <div id="tracker">
      <h2>Encounter</h2>
      <TrackerNavigator
        currentRound={currentRound}
        setCurrentRound={setCurrentRound}
        currentInit={currentInit}
        setCurrentInit={setCurrentInit}
      />

      <TrackerTable chars={chars} numRounds={numRounds} />
    </div>
  );
};
