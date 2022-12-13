import { useEffect, useState } from 'react';

import { EncounterTracker } from '../components/EncounterTracker';
import CharacterList from '../components/CharacterList';
import { Section } from '../components/Section';
import CharacterSheet from '../components/CharacterSheet';
import EncounterForm from '../components/EncounterForm';
import { Link, useParams } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN, QUERY_ENCOUNTER } from '../utils/queries';

import PageWrapper from '../components/PageWrapper';
import { Button, Title, Text, Card, Group, Avatar, Flex } from '@mantine/core';

function Campaign() {
  const { campaignId } = useParams();
  const { data: campaignData, loading: campaignLoading } = useQuery(
    QUERY_CAMPAIGN,
    {
      variables: { _id: campaignId },
    }
  );
  const [queryEncounter, { data: encounterData, loading: encounterLoading }] =
    useLazyQuery(QUERY_ENCOUNTER);

  const campaign = campaignData?.campaign || {};
  const [chars, setChars] = useState([]);
  const [activeEncounter, setActiveEncounter] = useState({});
  const [encounterFormOpen, setEncouterFormOpen] = useState(false);

  useEffect(() => {
    campaignData?.campaign && setChars(campaignData.campaign.characters);
  }, [campaignData]);

  useEffect(() => {
    setActiveEncounter(encounterData?.encounter);
  }, [encounterData]);

  return (
    <PageWrapper title={campaign.name} className='campaign-container'>
      {campaignLoading ? (
        <div>Loading</div>
      ) : (
        <>
          <Section title='Players' collapsable>
            <Card>
              <Flex align='center' gap='.25em'>
                <Avatar src={campaign?.owner?.avatar} />
                <Title order={4}>
                  {`${campaign?.owner?.firstname} ${campaign?.owner?.lastname}`}
                </Title>
              </Flex>
              <Text>DM</Text>
            </Card>
            {campaign?.players?.map((player, i) => (
              <Card key={i} onClick={() => {}}>
                <Flex align='center' gap='.25em'>
                  <Avatar src={player.avatar} />

                  <Title order={4}>
                    {`${player.firstname} 
                    ${player.lastname}`}
                  </Title>
                </Flex>
                {player?.characters
                  ?.filter(char => char.campaign?._id === campaignId)
                  .map((char, j) => (
                    <Text key={j}>{char.name}</Text>
                  ))}
              </Card>
            ))}
          </Section>
          <Section title='Characters' collapsable>
            {campaign?.characters?.map((char, i) => (
              <Card
                key={i}
                onClick={() => {}}
                // colorOne={char.primaryColor}
                // colorTwo={char.secondaryColor}
              >
                <div>{char.name}</div>
                <div>{`Player: ${char.user.firstname}`}</div>
              </Card>
            ))}
          </Section>
          <Section title='Encounter List' collapsable>
            <Button>New Encounter</Button>
            {campaign?.encounters?.map((enc, i) => (
              <Card
                key={i}
                onClick={() => {
                  queryEncounter({ variables: { _id: enc._id } });
                }}
              >
                <div>{enc.title}</div>
              </Card>
            ))}
          </Section>
          <Section title='Encounter Tracker' collapsable startOpen={true}>
            {encounterLoading && <div>Loading...</div>}
            <EncounterTracker chars={chars} activeEncounter={activeEncounter} />
          </Section>
          <Section title='Character Sheet' collapsable startOpen={false}>
            {chars.length > 0 && (
              <CharacterSheet chars={chars.filter(char => char.viewSheet)} />
            )}
          </Section>
        </>
      )}
    </PageWrapper>
  );
}

export default Campaign;
