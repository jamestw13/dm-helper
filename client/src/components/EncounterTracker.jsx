import { useState, useEffect } from 'react';
import { TrackerTable } from './TrackerTable';
import { TrackerNavigator } from './TrackerNavigator';
import { CharacterRow } from './CharacterRow';
import { Button, Table } from '@mantine/core';

export const EncounterTracker = ({ chars, activeEncounter = {} }) => {
  const [numRounds, setNumRounds] = useState(6);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);

  // TODO: replace with mutation
  const [encounterLog, setEncounterLog] = useState([]);

  // Initialize encounterLog

  const addRound = () => {
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
          <Table>
            <thead>
              <tr>
                <th></th>
                <th>Round</th>
                <th>Name</th>
                <th>HP</th>
                <th>AC</th>

                <th colSpan='100%'>Notes</th>
              </tr>
            </thead>
            <tbody id='tracker-table-body'>
              {activeEncounter?.encounterLog?.map((round, i) =>
                round.turns.map((turn, j) => (
                  <tr key={j}>
                    <td
                      data-row-round={i}
                      data-row-turn={j}
                      style={{
                        backgroundColor:
                          i === currentRound && j === currentTurn && 'yellow',
                      }}
                      onClick={() => {
                        setCurrentRound(i);
                        setCurrentTurn(j);
                      }}
                    >
                      &gt;
                    </td>
                    {j === 0 && (
                      <td rowSpan={round.turns.length}>{round.round}</td>
                    )}
                    <CharacterRow
                      key={turn.character + j}
                      character={turn.character}
                      statuses={turn.statuses}
                    />
                  </tr>
                ))
              )}
              <tr>
                <td colSpan='100%'>
                  <Button style={{ width: '100%' }} onClick={addRound}>
                    Add Round
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};
