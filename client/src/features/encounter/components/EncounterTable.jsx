import { useContext } from 'react';

import { CharacterRow, NoteCell, EncounterContext } from '../';

const EncounterTable = () => {
  const encData = useContext(EncounterContext);

  const addRound = () => {
    setNumRounds(x => x + 1);
  };

  const getRowSpan = effect => {
    const roundNum = (effect.endRound - effect.startRound) * encData?.characters?.length;
    const turnOffset = effect.endTurn - effect.startTurn;
    const result = roundNum - turnOffset;

    return result;
  };
  return (
    <table>
      <thead>
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
        {[...Array(encData.numRounds)].map((round, i) =>
          encData?.characters?.map((turn, j) => (
            <tr key={j}>
              <td
                style={{
                  backgroundColor: i === encData.currentRound && j === encData.currentTurn && 'yellow',
                }}
                onClick={() => {
                  encData.setCurrentRound(i);
                  encData.setCurrentTurn(j);
                }}
              >
                &gt;
              </td>
              {j === 0 && <td rowSpan={encData.characters.length}>{i + 1}</td>}
              <CharacterRow character={turn.character} roundNum={i} turnNum={j} />
              {encData.effects?.map(
                effect =>
                  effect.startRound === i &&
                  effect.startTurn === j && (
                    <NoteCell key={crypto.randomUUID()} effect={effect} rowSpan={getRowSpan(effect)} />
                  )
              )}
            </tr>
          ))
        )}
        <tr>
          <td colSpan="100%">
            <button
              className="standard"
              style={{ width: '100%' }}
              onClick={
                // () => {}
                () => encData.setNumRounds(x => x + 1)
              }
            >
              Add Round
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default EncounterTable;
