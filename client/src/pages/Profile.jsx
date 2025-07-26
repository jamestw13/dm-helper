import React, { useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Avatar, Card, Flex, Text, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

import { QUERY_ME, QUERY_USER, UserContext } from '../features/users';
import { ADD_CHARACTER } from '../features/characters';

import { Section, PageWrapper } from '../components';
import Auth from '../utils/auth';

const Profile = () => {
  const { user, loggedIn } = useContext(UserContext);

  if (!loggedIn) return <Navigate to="/" />;
  const navigate = useNavigate();

  const { userId: userParam } = useParams();

  const charForm = useForm({
    initialValues: {
      name: 'tj',
    },
  });

  const {
    loading,
    data: userData,
    refetch,
  } = useQuery(Auth.getProfile().data._id === userParam ? QUERY_ME : QUERY_USER, {
    variables: { _id: userParam },
  });

  const [addCharacter, { data: newCharData }] = useMutation(ADD_CHARACTER);

  const handleFriendClick = userId => {
    navigate(`/${userId}`);
  };

  const handleCharacterClick = charId => {
    navigate(`/sheet/${charId}`);
  };

  const handleNewCharSubmit = e => {
    e.preventDefault();
    addCharacter({
      variables: {
        character: { name: charForm.values.name, user: userParam },
      },
    });
    refetch();
  };

  const handleCampaignClick = campaignId => {
    return navigate(`/campaign/${campaignId}`);
  };
  return (
    <PageWrapper title={user.firstname ? `${user.firstname || ''} ${user.lastname || ''}` : user.username}>
      <div style={{ display: 'flex' }} todo gap="xs">
        <Section title="Friends List">
          {user?.friends?.map(friend => (
            <Card key={friend._id} onClick={() => handleFriendClick(friend._id)}>
              <div style={{ display: 'flex' }} todo align="center">
                <Avatar />
                <h4>{`${friend.firstname} ${friend.lastname}`}</h4>
              </div>
            </Card>
          ))}
        </Section>
        <Section title="Character List">
          {user?.characters?.map(char => (
            <Card key={char._id} onClick={() => handleCharacterClick(char._id)}>
              <h4 className="char-name">{char.name}</h4>
              <Text className="char-encounter">
                {!!char.campaign && (char.isNPC ? `NPC in: ${char.campaign.name}` : `PC in: ${char.campaign.name}`)}
              </Text>
            </Card>
          ))}
        </Section>

        <Section title="Campaign List">
          {user?.campaigns?.map(campaign => (
            <Card key={campaign._id} onClick={() => handleCampaignClick(campaign._id)}>
              <h4 className="char-name">{campaign.name}</h4>
              <Text className="char-encounter">{`DM: ${campaign?.owner?.username}`}</Text>
            </Card>
          ))}
        </Section>
      </div>
    </PageWrapper>
  );
};

export default Profile;
