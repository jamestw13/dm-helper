import React, { useContext, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Avatar, Card, Flex, Text, Title } from '@mantine/core';

import { QUERY_USER, UserContext } from '..';
import { ADD_CHARACTER } from '../../characters';
import Feed from './Feed';

import { Section, PageWrapper } from '../../../components';
import Auth from '../../../utils/auth';

const Profile = () => {
  console.log('Profile page');
  const { user, loggedIn } = useContext(UserContext);

  if (!loggedIn) return <Navigate to="/" />;

  const { username } = useParams();

  const navigate = useNavigate();

  const {
    loading,
    data: userData,
    refetch,
  } = useQuery(QUERY_USER, {
    variables: { username },
  });

  user = userData.user || {};
  console.log(userData);

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
    <PageWrapper title={user.firstname ? `${user.firstname || ''} ${user.lastname || ''}` : user.username}>
      <Flex gap="xs">
        <Section title="Friends List">
          {user?.friends?.map(friend => (
            <Card key={friend._id} onClick={() => handleFriendClick(friend._id)}>
              <Flex align="center">
                <Avatar />
                <Title order={4}>{`${friend.firstname} ${friend.lastname}`}</Title>
              </Flex>
            </Card>
          ))}
        </Section>
        <Section title="Character List">
          {user?.characters?.map(char => (
            <Card key={char._id} onClick={() => handleCharacterClick(char._id)}>
              <Title order={4} className="char-name">
                {char.name}
              </Title>
              <Text className="char-encounter">
                {!!char.campaign && (char.isNPC ? `NPC in: ${char.campaign.name}` : `PC in: ${char.campaign.name}`)}
              </Text>
            </Card>
          ))}
        </Section>

        <Section title="Campaign List">
          {user?.campaigns?.map(campaign => (
            <Card key={campaign._id} onClick={() => handleCampaignClick(campaign._id)}>
              <Title order={4} className="char-name">
                {campaign.name}
              </Title>
              <Text className="char-encounter">{`DM: ${campaign?.owner?.username}`}</Text>
            </Card>
          ))}
        </Section>
      </Flex>
    </PageWrapper>
  );
};

export default Profile;
