import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import { Section, PageWrapper } from '../../../components';
// import CharacterSheet from '../components/CharacterSheet';

import { QUERY_CAMPAIGN } from '..';

import { Avatar } from '../../../components/Avatar';
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

  if (campaignLoading) return <div>Loading...</div>;

  return (
    <PageWrapper
      title={`Campaign: ${campaign.name}`}
      subtitle={
        <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
          <p>DM:</p>
          <Avatar src={campaign?.owner?.avatar} />
          <h4>{campaign?.owner?.username}</h4>
        </div>
      }
      className="campaign-container"
    >
      <>
        {/* Player Section */}
        <Section title="Players">
          {campaign?.players?.map((player, i) => (
            <div key={i} onClick={() => {}} style={{ display: 'flex' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <Avatar src={player.avatar} />

                <h4>
                  {`${player.firstname} 
                    ${player.lastname}`}
                </h4>
              </div>
              <div style={{ display: 'grid' }}>
                {player?.characters
                  ?.filter(char => char.campaign?._id === campaignId)
                  .map((char, j) => (
                    <p key={j}>{char.name}</p>
                  ))}
              </div>
            </div>
          ))}
        </Section>

        {/* Character Section */}
        <Section title="Characters">
          {campaign?.characters.map((char, i) => (
            <div key={i} onClick={() => {}}>
              <h5>{char.name}</h5>
              <p>{char.user.firstname}</p>
            </div>
          ))}
        </Section>

        {/* Encounter Section */}
        <Section title="Encounter List">
          <Button>New Encounter</Button>
          {campaign?.encounters?.map((enc, i) => (
            <div key={i}>
              <div>
                <div value={enc.title}>
                  <div style={{ display: 'flex' }} align="center">
                    <div>{enc.title}</div>
                  </div>
                  <div>
                    <p>{enc.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Section>

        {/* <Section title='Character Sheet' collapsable startOpen={false}>
            {chars.length > 0 && (
              <CharacterSheet chars={chars.filter(char => char.viewSheet)} />
            )}
          </Section> */}
      </>
    </PageWrapper>
  );
}

export default Campaign;
