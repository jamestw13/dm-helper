import React, { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { Avatar, Button, Card, Flex, Group, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';

import { QUERY_ME, QUERY_USER } from '../features/users';
import { ADD_CHARACTER } from '../features/characters';

import { Section, PageWrapper } from '../components';
import Auth from '../utils/auth';

const Profile = () => {
  if (!Auth.loggedIn()) return <Navigate to="/" />;

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

  const user = userData?.me || userData?.user || {};

  const [addCharacter, { data: newCharData }] = useMutation(ADD_CHARACTER);

  useEffect(() => {
    console.log({ newCharData });
  }, [newCharData]);

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
      <Section title="Friends">
        <Button>Add Friend</Button>
        {user?.friends?.map((friend, i) => (
          <Card key={i} onClick={() => handleFriendClick(friend._id)}>
            <Flex align="center">
              <Avatar />
              <Title order={4}>{`${friend.firstname} ${friend.lastname}`}</Title>
            </Flex>
          </Card>
        ))}
      </Section>
      <Section title="Character List">
        <form onSubmit={handleNewCharSubmit}>
          <Group>
            <TextInput placeholder="Character Name" {...charForm.getInputProps('name')} />
            <Button type="submit">Add Character</Button>
          </Group>
        </form>
        {user?.characters?.map((char, i) => (
          <Card key={i} onClick={() => handleCharacterClick(char._id)}>
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
        <Button>Add Campaign</Button>
        {user?.campaigns?.map(campaign => (
          <Card key={campaign._id} onClick={() => handleCampaignClick(campaign._id)}>
            <Title order={4} className="char-name">
              {campaign.name}
            </Title>
            <Text className="char-encounter">{`DM: ${campaign?.owner?.username}`}</Text>
          </Card>
        ))}
      </Section>
    </PageWrapper>
  );
};

export default Profile;
