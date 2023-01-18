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
import NoteCell from '../components/NoteCell';

const Encounter = () => {
  const { encounterId } = useParams();
  const { data: encounterData, loading: encounterLoading } = useQuery(QUERY_ENCOUNTER, {
    variables: { _id: encounterId },
  });
  const eData = encounterData?.encounter ? encounterData.encounter : {};

  const [numRounds, setNumRounds] = useState(6);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);

  // TODO: replace with mutation
  const [encounterLog, setEncounterLog] = useState([]);

  // Initialize encounterLog

  const addRound = () => {
    setNumRounds(x => x + 1);
  };

  const getRowSpan = effect => {
    const roundNum = (effect.endRound - effect.startRound) * eData?.characters?.length;
    const turnOffset = effect.endTurn - effect.startTurn;
    const result = roundNum - turnOffset;
    console.log(effect.endRound, effect.startRound, eData.characters.length, roundNum, turnOffset, result);
    return result;
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
              {[...Array(numRounds)].map((round, i) =>
                eData?.characters?.map((turn, j) => (
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
                    {j === 0 && <td rowSpan={eData.characters.length}>{i}</td>}
                    <CharacterRow character={turn.character} roundNum={i} turnNum={j} />
                    {eData?.effects?.map(
                      effect =>
                        effect.startRound === i &&
                        effect.startTurn === j && (
                          <NoteCell key={`${i}+${j}`} effect={effect} rowSpan={getRowSpan(effect)} />
                        )
                    )}
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
