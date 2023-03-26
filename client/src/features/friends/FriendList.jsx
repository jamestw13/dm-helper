import { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FRIEND } from '.';
import { UserContext } from '../users';
import { Button, Card, Dialog, Group, Text, TextInput, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { PageWrapper } from '../../components';

const FriendList = () => {
  const {
    user,
    user: { friends },
  } = useContext(UserContext);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [friendInput, setFriendInput] = useState('');

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
        <Card key={friend._id} className="char-list-item" onClick={() => handleFriendClick(friend.username)}>
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
          <Button onClick={addFriend} disabled={friendInput.length < 1}>
            Search
          </Button>
        </Group>
      </Dialog>
    </PageWrapper>
  );
};

export default FriendList;
