import { Text, Title } from '@mantine/core';

import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN, QUERY_ENCOUNTER } from '../utils/queries';

import PageWrapper from '../components/PageWrapper';
import { Section } from '../components/Section';
import { EncounterTracker } from '../components/EncounterTracker';
import { useState, useEffect } from 'react';
import { TrackerTable } from '../components/TrackerTable';
import { TrackerNavigator } from '../components/TrackerNavigator';
import { CharacterRow } from '../components/CharacterRow';
import { Button, Popover, Table, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const Encounter = () => {
  const { encounterId } = useParams();
  const { data: encounterData, loading: encounterLoading } = useQuery(QUERY_ENCOUNTER, {
    variables: { _id: encounterId },
  });
  const eData = encounterData?.encounter ? encounterData.encounter : {};

  const [currentRound, setCurrentRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);

  const noteForm = useForm({ initialValues: { note: 'test' } });

  // TODO: replace with mutation
  const [encounterLog, setEncounterLog] = useState([]);

  // Initialize encounterLog

  useEffect(() => {
    console.log({ eData });
    if (!!eData.encounterLog) {
      setEncounterLog(JSON.parse(JSON.stringify(eData.encounterLog)));
    }
  }, [eData]);

  const addRound = () => {
    // const lastRound = logCopy.pop();
    // lastRound.round++;
    // lastRound.turns.forEach(turn => (turn.statuses = []));
    // setEncounterLog([...encounterLog, lastRound]);
  };

  const handleSubmit = (values, round, turn) => {
    encounterLog[round].turns[turn].statuses.push({
      condition: values.note,

      startRound: round,
      startTurn: turn,
      target: {
        name: 'Sigríður Löffler',
      },
    });
    // const logCopy = encounterLog.map(round => ({ round }));

    // console.log(logCopy[round].round.turns[turn].statuses.push({ condition: values.note }));

    // setEncounterLog(logCopy[round].round.turns[turn].statuses.push({ condition: values.note }));
  };

  return (
    <PageWrapper title={eData.title}>
      <Section>
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
      </Section>
    </PageWrapper>
  );
};

export default Encounter;
