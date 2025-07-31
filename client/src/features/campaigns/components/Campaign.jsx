import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import { Section, PageWrapper } from '../../../components';
// import CharacterSheet from '../components/CharacterSheet';

import { QUERY_CAMPAIGN } from '..';

import { Title, Text, Card, Avatar, Chip, Indicator, Box, Accordion, ActionIcon } from '@mantine/core';
import { IconArrowRightTail } from '@tabler/icons';
import { Button } from '../../../components/Button';

function Campaign() {
  const { campaignId } = useParams();
  const { data: campaignData, loading: campaignLoading } = useQuery(QUERY_CAMPAIGN, {
    variables: { _id: campaignId },
  });

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
    <PageWrapper title={`Campaign: ${campaign.name}`} className="campaign-container">
      {campaignLoading ? (
        <div>Loading</div>
      ) : (
        <>
          {/* Player Section */}
          <Section title="Players" collapsable>
            <Card>
              <div
                style={{
                  zIndex: 2,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '12px',
                  paddingInline: 'calc(15px / 2)',
                  backgroundColor: '#e03131',
                  color: '#fff',
                  whiteSpace: 'nowrap',
                  top: '10px',
                  left: '50%',
                  position: 'absolute',
                  borderRadius: '50%',
                  transform: 'translate(-50%,-50%)',
                  overflow: 'visible',
                }}
                label={<h6>DM</h6>}
              >
                DM
              </div>
              <div style={{ display: 'flex' }} align="center" gap=".25em">
                <Avatar src={campaign?.owner?.avatar} />

                <h4>{campaign?.owner?.username}</h4>
              </div>
            </Card>

            {campaign?.players?.map((player, i) => (
              <Card key={i} onClick={() => {}}>
                <div style={{ display: 'flex' }} align="center" gap=".25em">
                  <Avatar src={player.avatar} />

                  <h4>
                    {`${player.firstname} 
                    ${player.lastname}`}
                  </h4>
                </div>
                {player?.characters
                  ?.filter(char => char.campaign?._id === campaignId)
                  .map((char, j) => (
                    <Text key={j}>{char.name}</Text>
                  ))}
              </Card>
            ))}
          </Section>

          {/* Character Section */}
          <Section title="Characters" collapsable>
            <Chip.Group multiple={true} value={charSelect} onChange={setCharSelect} spacing="0">
              <Chip variant="filled" radius="sm" value="pc">
                PCs
              </Chip>
              <Chip variant="filled" radius="sm" value="npc">
                NPCs
              </Chip>
            </Chip.Group>

            {campaign?.characters
              ?.filter(char => (charSelect.includes('pc') && !char.isNPC) || (charSelect.includes('npc') && char.isNPC))
              .map((char, i) => (
                <Card key={i} onClick={() => {}}>
                  <h5>{char.name}</h5>
                  <Text>{char.user.firstname}</Text>
                </Card>
              ))}
          </Section>

          {/* Encounter Section */}
          <Section title="Encounter List" collapsable>
            <Button>New Encounter</Button>
            {campaign?.encounters?.map((enc, i) => (
              <Box key={i}>
                <Accordion chevronPosition="left">
                  <Accordion.Item value={enc.title}>
                    <div style={{ display: 'flex' }} align="center">
                      <Accordion.Control>{enc.title}</Accordion.Control>
                      <ActionIcon
                        size="xl"
                        onClick={() => {
                          handleEncounterClick(enc._id);
                        }}
                      >
                        <IconArrowRightTail />
                      </ActionIcon>
                    </div>
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
