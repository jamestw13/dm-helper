import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';

import { PageWrapper, Section } from '../components';

import { EncounterTable, TrackerNavigator, QUERY_ENCOUNTER, ADD_NOTE, EncounterContext } from '../features/encounter';

const Encounter = () => {
  const { encounterId } = useParams();
  const {
    data: encounterData,
    loading: encounterLoading,
    refetch: encRefetch,
  } = useQuery(QUERY_ENCOUNTER, {
    variables: { _id: encounterId },
  });
  const [addNote, { data: noteData }] = useMutation(ADD_NOTE, { onCompleted: encRefetch });
  const eData = encounterData?.encounter ? encounterData.encounter : {};

  const [numRounds, setNumRounds] = useState(6);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentTurn, setCurrentTurn] = useState(0);

  return (
    <EncounterContext.Provider
      value={{
        encounterId,
        characters: eData.characters,
        effects: eData.effects,
        currentRound,
        setCurrentRound,
        currentTurn,
        setCurrentTurn,
        numRounds,
        setNumRounds,
        addNote,
      }}
    >
      <PageWrapper title={eData.title}>
        <Section>
          <EncounterTable />
        </Section>
        <div>
          <TrackerNavigator />
        </div>
      </PageWrapper>
    </EncounterContext.Provider>
  );
};

export default Encounter;
