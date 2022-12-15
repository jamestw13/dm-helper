import { Text, Title } from '@mantine/core';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN, QUERY_ENCOUNTER } from '../utils/queries';

import PageWrapper from '../components/PageWrapper';
import { Section } from '../components/Section';
import { EncounterTracker } from '../components/EncounterTracker';

const Encounter = () => {
  const { encounterId } = useParams();
  const { data: encounterData, loading: encounterLoading } = useQuery(
    QUERY_ENCOUNTER,
    { variables: { _id: encounterId } }
  );
  const eData = encounterData?.encounter ? encounterData.encounter : {};
  return (
    <PageWrapper title={eData.title}>
      <Section>
        <EncounterTracker activeEncounter={eData} />
      </Section>
    </PageWrapper>
  );
};

export default Encounter;
