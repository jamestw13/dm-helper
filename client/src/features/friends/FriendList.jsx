import { useState, useContext } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { ADD_FRIEND, FIND_FRIENDS } from '.';
import { UserContext } from '../users';
import { Button, Card, Dialog, Group, Text, TextInput, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../components';
import UserCard from '../users/components/UserCard';

const FriendList = () => {
  const {
    user,
    user: { friends },
  } = useContext(UserContext);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [friendInput, setFriendInput] = useState('');

  const [findFriends, { data: searchResults }] = useLazyQuery(FIND_FRIENDS, {
    variables: { searchTerm: friendInput },
  });

  const friendResults = searchResults?.friendSearch || [];
  console.log(friendResults);
  const [addFriend] = useMutation(ADD_FRIEND, { variables: { me: user._id, friend: friendInput } });

  const navigate = useNavigate();

  const handleFriendClick = userId => {
    return navigate(`/${userId}`);
  };

  return (
    <PageWrapper title="My Friends">
      <Button
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Add Friend
      </Button>
      {friends?.map(friend => (
        <Card key={friend._id} className="char-list-item" onClick={() => handleFriendClick(friend._id)}>
          <Title order={4}>{friend.username}</Title>
        </Card>
      ))}
      <Dialog
        opened={dialogOpen}
        withCloseButton
        onClose={() => setDialogOpen(false)}
        position={{ top: '15em', left: '30em' }}
      >
        <Text size="sm" mb="xs" weight={500}>
          Find a friend
        </Text>

        <Group align="flex-end">
          <TextInput
            value={friendInput}
            onChange={e => setFriendInput(e.target.value)}
            placeholder="Search for friends"
            sx={{ flex: 1 }}
          />
          <Button onClick={findFriends} disabled={friendInput.length < 1}>
            Search
          </Button>
        </Group>
        <Group align="center">
          {friendResults?.map(user => (
            <UserCard user={user} />
          ))}
        </Group>
      </Dialog>
    </PageWrapper>
  );
};

export default FriendList;
