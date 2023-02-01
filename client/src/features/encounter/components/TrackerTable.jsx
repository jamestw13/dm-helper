import { useEffect } from 'react';
import { useState } from 'react';
import { CharacterRow } from '../';

const TrackerTable = ({
  encounterLog,
  setEncounterLog,
  setCurrentRound,
  setCurrentTurn,
  currentRound,
  currentTurn,
  addRound,
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

            <th colSpan="100%">Notes</th>
          </tr>
        </thead>
        <tbody id="tracker-table-body">
          {encounterLog?.map((e, i) =>
            e.turns.map((turn, j) => (
              <tr key={j}>
                <td
                  data-row-round={i}
                  data-row-turn={j}
                  style={{
                    backgroundColor: i === currentRound && j === currentTurn && 'yellow',
                  }}
                  onClick={() => {
                    setCurrentRound(i);
                    setCurrentTurn(j);
                  }}
                >
                  &gt;
                </td>
                {j === 0 && <td rowSpan={e.turns.length}>{e.round}</td>}
                <CharacterRow key={turn.char.name + j} character={turn.char} statuses={turn.statuses} />
              </tr>
            ))
          )}
          <tr>
            <td colSpan="100%">
              <button style={{ width: '100%' }} onClick={addRound}>
                Add Round
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TrackerTable;
