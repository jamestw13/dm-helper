import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_ENCOUNTER } from '../utils/queries';

import PageWrapper from '../components/PageWrapper';
import { Section } from '../components/Section';

import { useState, useEffect } from 'react';
import { TrackerNavigator } from '../components/TrackerNavigator';
import { EncounterContext } from '../Contexts/EncounterContext';
import EncounterTable from '../components/EncounterTable';
import { Affix } from '@mantine/core';
import { ADD_NOTE } from '../utils/mutations';
import { useMutation } from '@apollo/client';

const Encounter = () => {
  const { encounterId } = useParams();
  const {
    data: encounterData,
    loading: encounterLoading,
    refetch: encRefetch,
  } = useQuery(QUERY_ENCOUNTER, {
    variables: { _id: encounterId },
  });
  const [addNote, { data: noteData }] = useMutation(ADD_NOTE);
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
        <Affix position={{ bottom: '3rem', left: '1rem' }}>
          <TrackerNavigator />
        </Affix>
      </PageWrapper>
    </EncounterContext.Provider>
  );
};

export default Encounter;
