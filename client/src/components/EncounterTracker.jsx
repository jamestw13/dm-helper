import { useState, useEffect } from 'react';
import { TrackerTable } from './TrackerTable';
import { TrackerNavigator } from './TrackerNavigator';
import { CharacterRow } from './CharacterRow';
import { Button, Popover, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

export const EncounterTracker = ({ chars, activeEncounter = {} }) => {
  const [currentRound, setCurrentRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);

  const noteForm = useForm({ initialValues: { note: 'test' } });

  const encounterData = activeEncounter || {};
  // TODO: replace with mutation
  const [encounterLog, setEncounterLog] = useState(encounterData.encounterLog);

  // Initialize encounterLog

  const addRound = () => {
    const lastRound = logCopy.pop();
    lastRound.round++;

    lastRound.turns.forEach(turn => (turn.statuses = []));

    setEncounterLog([...encounterLog, lastRound]);
  };

  const handleSubmit = (values, round, turn) => {
    // e.preventDefault();

    console.log(values.note, { round }, { turn });
    const updatedLog = encounterLog;
    updatedLog[round].turns[turn].statuses.push({ condition: values.note });

    console.log({ updatedLog });

    // setEncounterLog([...encounterLog, encounterLog[round].turns[turn].statuses.push({ condition: values.note })]);
  };

  return (
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

            <th colSpan="100%">Notes</th>
          </tr>
        </thead>
        <tbody id="tracker-table-body">
          {encounterLog?.map((round, i) =>
            round.turns.map((turn, j) => (
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
                {j === 0 && <td rowSpan={round.turns.length}>{round.round}</td>}
                <CharacterRow
                  key={turn.character + j}
                  character={turn.character}
                  statuses={turn.statuses}
                  numChars={round.turns.length}
                />
                <td>
                  <Popover>
                    <Popover.Target>
                      <Button size="xs">+</Button>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <form
                        onSubmit={noteForm.onSubmit(values => {
                          handleSubmit(values, i, j);
                        })}
                      >
                        <TextInput label="Note" {...noteForm.getInputProps('note')} />
                        <Button type="submit">Enter</Button>
                      </form>
                    </Popover.Dropdown>
                  </Popover>
                </td>
              </tr>
            ))
          )}
          <tr>
            <td colSpan="100%">
              <Button style={{ width: '100%' }} onClick={addRound}>
                Add Round
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
