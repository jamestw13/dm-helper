import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Card, Text } from '@mantine/core';

// import './Profile.css';
import CharacterList from '../components/CharacterList';

import Auth from '../utils/auth';
import CampaignList from '../components/CampaignList';

import CharacterSheet from '../components/CharacterSheet';
import { Section } from '../components/Section';
import PageWrapper from '../components/PageWrapper';

const Profile = ({ data }) => {
  const navigate = useNavigate();
  const handleCharacterClick = charId => {
    navigate(`/sheet/${charId}`);
  };

  const handleCampaignClick = campaignId => {
    return navigate(`/campaign/${campaignId}`);
  };
  // const { username: userParam } = useParams();

  // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam },
  // });

  // const user = data?.me || data?.user || {};
  const [selectedChar, setSelectedChar] = useState('');

  if (!Auth.loggedIn()) return <Navigate to='/' />;

  // // redirect to person profile page if username is the logged-in user's
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to='/profile' />;
  // }

  return (
    <PageWrapper title='Dashboard'>
      <Section title='Character List'>
        {data?.characters?.map((char, i) => (
          <Card
            key={i}
            // colorOne={char.primaryColor}
            // colorTwo={char.secondaryColor}
            onClick={handleCharacterClick}
          >
            <Text weight={500} className='char-name'>
              {char.name}
            </Text>
            <div className='char-encounter'>
              {!!char.campaign &&
                (char.isNPC
                  ? `NPC in: ${char.campaign.name}`
                  : `PC in: ${char.campaign.name}`)}
            </div>
          </Card>
        ))}
      </Section>
      {!!selectedChar && (
        <Section title='Character Sheet'>
          <CharacterSheet charId={selectedChar._id} />
        </Section>
      )}
      <Section title='Campaign List'>
        {data?.campaigns?.map(campaign => (
          <Card
            key={campaign._id}
            onClick={() => handleCampaignClick(campaign._id)}
          >
            <Text weight={500} className='char-name'>
              {campaign.name}
            </Text>
            <div className='char-encounter'>{`DM: ${campaign.owner.username}`}</div>
          </Card>
        ))}
      </Section>
    </PageWrapper>
  );
};

export default Profile;
