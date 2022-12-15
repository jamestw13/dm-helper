import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Avatar, Card, Flex, Text, Title } from '@mantine/core';

import { QUERY_ME, QUERY_USER } from '../utils/queries';

import Auth from '../utils/auth';

import CharacterSheet from '../components/CharacterSheet';
import { Section } from '../components/Section';
import PageWrapper from '../components/PageWrapper';

const Profile = () => {
  if (!Auth.loggedIn()) return <Navigate to='/' />;

  const navigate = useNavigate();

  const { userId: userParam } = useParams();

  const { loading, data: userData } = useQuery(
    Auth.getProfile().data._id === userParam ? QUERY_ME : QUERY_USER,
    {
      variables: { _id: userParam },
    }
  );

  const user = userData?.me || userData?.user || {};

  const [selectedChar, setSelectedChar] = useState('');

  const handleFriendClick = userId => {
    navigate(`/${userId}`);
  };

  const handleCharacterClick = charId => {
    navigate(`/sheet/${charId}`);
  };

  const handleCampaignClick = campaignId => {
    return navigate(`/campaign/${campaignId}`);
  };
  return (
    <PageWrapper title={`${user.firstname} ${user.lastname}`}>
      <Section title='Friends'>
        {user?.friends?.map((friend, i) => (
          <Card key={i} onClick={() => handleFriendClick(friend._id)}>
            <Flex align='center'>
              <Avatar />
              <Title
                order={4}
              >{`${friend.firstname} ${friend.lastname}`}</Title>
            </Flex>
          </Card>
        ))}
      </Section>
      <Section title='Character List'>
        {user?.characters?.map((char, i) => (
          <Card
            key={i}
            // colorOne={char.primaryColor}
            // colorTwo={char.secondaryColor}
            onClick={() => handleCharacterClick(char._id)}
          >
            <Title order={4} className='char-name'>
              {char.name}
            </Title>
            <Text className='char-encounter'>
              {!!char.campaign &&
                (char.isNPC
                  ? `NPC in: ${char.campaign.name}`
                  : `PC in: ${char.campaign.name}`)}
            </Text>
          </Card>
        ))}
      </Section>
      {!!selectedChar && (
        <Section title='Character Sheet'>
          <CharacterSheet charId={selectedChar._id} />
        </Section>
      )}
      <Section title='Campaign List'>
        {user?.campaigns?.map(campaign => (
          <Card
            key={campaign._id}
            onClick={() => handleCampaignClick(campaign._id)}
          >
            <Title order={4} className='char-name'>
              {campaign.name}
            </Title>
            <Text className='char-encounter'>{`DM: ${campaign?.owner?.username}`}</Text>
          </Card>
        ))}
      </Section>
    </PageWrapper>
  );
};

export default Profile;
