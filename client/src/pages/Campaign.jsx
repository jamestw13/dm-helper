import { useEffect, useState } from 'react';

import { Section } from '../components/Section';
import CharacterSheet from '../components/CharacterSheet';

import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN } from '../utils/queries';

import PageWrapper from '../components/PageWrapper';
import {
  Button,
  Title,
  Text,
  Card,
  Avatar,
  Flex,
  Chip,
  Indicator,
  Box,
  Accordion,
  ActionIcon,
} from '@mantine/core';
import { IconArrowRightTail } from '@tabler/icons';

function Campaign() {
  const { campaignId } = useParams();
  const { data: campaignData, loading: campaignLoading } = useQuery(
    QUERY_CAMPAIGN,
    {
      variables: { _id: campaignId },
    }
  );

  const navigate = useNavigate();
  const campaign = campaignData?.campaign || {};
  const [chars, setChars] = useState([]);
  const [activeEncounter, setActiveEncounter] = useState({});

  const [charSelect, setCharSelect] = useState(['npc']);

  useEffect(() => {
    campaignData?.campaign && setChars(campaignData.campaign.characters);
  }, [campaignData]);

  const handleEncounterClick = encounterId => {
    return navigate(`/encounter/${encounterId}`);
  };

  return (
    <PageWrapper
      title={`Campaign: ${campaign.name}`}
      className='campaign-container'
    >
      {campaignLoading ? (
        <div>Loading</div>
      ) : (
        <>
          {/* Player Section */}
          <Section title='Players' collapsable>
            <Indicator
              label={<Title order={6}>DM</Title>}
              color='red'
              position='top-center'
              size='sm'
              zIndex={2}
            >
              <Card>
                <Flex align='center' gap='.25em'>
                  <Avatar src={campaign?.owner?.avatar} />

                  <Title order={4}>
                    {`${campaign?.owner?.firstname} ${campaign?.owner?.lastname}`}
                  </Title>
                </Flex>
              </Card>
            </Indicator>
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

          {/* Character Section */}
          <Section title='Characters' collapsable>
            <Chip.Group
              multiple={true}
              value={charSelect}
              onChange={setCharSelect}
              spacing='0'
            >
              <Chip variant='filled' radius='sm' value='pc'>
                PCs
              </Chip>
              <Chip variant='filled' radius='sm' value='npc'>
                NPCs
              </Chip>
            </Chip.Group>

            {campaign?.characters
              ?.filter(
                char =>
                  (charSelect.includes('pc') && !char.isNPC) ||
                  (charSelect.includes('npc') && char.isNPC)
              )
              .map((char, i) => (
                <Card key={i} onClick={() => {}}>
                  <Title order={5}>{char.name}</Title>
                  <Text>{char.user.firstname}</Text>
                </Card>
              ))}
          </Section>

          {/* Encounter Section */}
          <Section title='Encounter List' collapsable>
            <Button>New Encounter</Button>
            {campaign?.encounters?.map((enc, i) => (
              <Box key={i}>
                <Accordion chevronPosition='left'>
                  <Accordion.Item value={enc.title}>
                    <Flex align='center'>
                      <Accordion.Control>{enc.title}</Accordion.Control>
                      <ActionIcon
                        size='xl'
                        onClick={() => {
                          handleEncounterClick(enc._id);
                        }}
                      >
                        <IconArrowRightTail />
                      </ActionIcon>
                    </Flex>
                    <Accordion.Panel>
                      <Text>{enc.description}</Text>
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </Box>
            ))}
          </Section>

          {/* <Section title='Character Sheet' collapsable startOpen={false}>
            {chars.length > 0 && (
              <CharacterSheet chars={chars.filter(char => char.viewSheet)} />
            )}
          </Section> */}
        </>
      )}
    </PageWrapper>
  );
}

export default Campaign;
