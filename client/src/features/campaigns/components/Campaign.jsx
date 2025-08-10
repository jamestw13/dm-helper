import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useQuery } from '@apollo/client';

import { PageWrapper } from '../../../components';
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
        <div className="section-container">
          <h2>Players</h2>

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
        </div>

        {/* Character Section */}
        <div className="section-container">
          <h2>Characters</h2>
          {campaign?.characters.map((char, i) => (
            <div key={i} onClick={() => {}}>
              <h5>{char.name}</h5>
              <p>{char.user.firstname}</p>
            </div>
          ))}
        </div>

        {/* Encounter Section */}
        <div className="section-container">
          <h2>Encounters</h2>
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
        </div>
      </>
    </PageWrapper>
  );
}

export default Campaign;
