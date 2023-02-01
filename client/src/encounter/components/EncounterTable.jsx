import { CharacterRow } from '../components/CharacterRow';
import { Button, Table } from '@mantine/core';
import { EncounterContext } from '../Contexts/EncounterContext';
import NoteCell from './NoteCell';
import { useContext } from 'react';

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
    <Table>
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
            <Button
              style={{ width: '100%' }}
              onClick={
                // () => {}
                () => encData.setNumRounds(x => x + 1)
              }
            >
              Add Round
            </Button>
          </td>
        </tr>
      </tbody>
    </Table>
  );
};

export default EncounterTable;
