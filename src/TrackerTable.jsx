import { useEffect } from "react";
import { useState } from "react";
import { CharacterRow } from "./CharacterRow";

export const TrackerTable = ({
  encounterLog,
  setEncounterLog,
  setCurrentRound,
  setCurrentTurn,
  currentRound,
  currentTurn,
}) => {
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
          {encounterLog?.map((e, i) =>
            e.turns.map((turn, j) => (
              <tr key={turn.index}>
                <td
                  data-row-round={i}
                  data-row-turn={j}
                  style={{
                    backgroundColor:
                      i === currentRound && j === currentTurn && "yellow",
                  }}
                  onClick={() => {
                    setCurrentRound(i);
                    setCurrentTurn(j);
                  }}
                >
                  &gt;
                </td>
                {j === 0 && <td rowSpan={e.turns.length}>{e.round}</td>}
                <CharacterRow
                  key={turn.char.name + j}
                  character={turn.char}
                  statuses={turn.statuses}
                />
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};
