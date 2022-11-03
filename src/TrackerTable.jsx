import { useEffect } from "react";
import { useState } from "react";
import { CharacterRow } from "./CharacterRow";
import { statuses } from "./demoData";

export const TrackerTable = ({ chars, numRounds }) => {
  const [activeChars, setActiveChars] = useState(
    chars.filter((char) => !!char.inEncounter)
  );
  const [encounterLog, setEncounterLog] = useState([]);

  useEffect(() => {
    const data = [...Array(numRounds + 1)].map((round, i) => {
      return {
        round: i,
        turns: activeChars?.map((char, j) => {
          return {
            j,
            char,
            statuses: statuses.filter((status) => {
              return status.startRound === i && status.startTurn === j;
            }),
          };
        }),
      };
    });
    setEncounterLog(data);
  }, [activeChars]);

  useEffect(() => {
    setActiveChars(chars.filter((char) => !!char.inEncounter));
  }, [chars]);

  return (
    <>
      <table id="tracker-table">
        <thead id="tracker-header">
          <tr>
            <th></th>
            <th>Round</th>
            <th>Name</th>
            <th>HP</th>
            <th>AC</th>
            <th>Init</th>
            <th colSpan="100%">Statuses</th>
          </tr>
        </thead>
        <tbody>
          {encounterLog &&
            encounterLog.map((e) =>
              e.turns.map((turn, j) => {
                console.log(turn);
                return (
                  <tr key={turn.index}>
                    <td>&gt;</td>
                    {j === 0 && <td rowSpan={e.turns.length}>{e.round}</td>}
                    <CharacterRow
                      key={turn.char.name + j}
                      character={turn.char}
                      statuses={turn.statuses}
                    />
                  </tr>
                );
              })
            )}
        </tbody>
      </table>
    </>
  );
};
