import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ENCOUNTER } from '../utils/queries';

import PageWrapper from '../components/PageWrapper';
import { Section } from '../components/Section';

import { useState, useEffect } from 'react';

import { TrackerNavigator } from '../components/TrackerNavigator';
import { CharacterRow } from '../components/CharacterRow';
import { Button, Table } from '@mantine/core';
import { EncounterContext } from '../Contexts/EncounterContext';

const Encounter = () => {
  const { encounterId } = useParams();
  const { data: encounterData, loading: encounterLoading } = useQuery(QUERY_ENCOUNTER, {
    variables: { _id: encounterId },
  });
  const eData = encounterData?.encounter ? encounterData.encounter : {};

  const [currentRound, setCurrentRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);

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

  return (
    <EncounterContext.Provider value={{ characters: eData.characters, encounterLog, setEncounterLog }}>
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
              {encounterLog?.length > 0 &&
                encounterLog?.map((round, i) =>
                  round.turns.map((turn, j) => (
                    <tr key={j}>
                      <td
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
                      <CharacterRow character={turn.character} statuses={turn.statuses} roundNum={i} turnNum={j} />
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
    </EncounterContext.Provider>
  );
};

export default Encounter;
