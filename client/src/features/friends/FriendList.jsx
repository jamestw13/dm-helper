import { useState, useContext } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { ADD_FRIEND, FIND_FRIENDS } from '.';
import { UserContext } from '../users';
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
      <button
        className="standard"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Add Friend
      </button>
      {friends?.map(friend => (
        <div key={friend._id} className="char-list-item" onClick={() => handleFriendClick(friend.username)}>
          <h4>{friend.username}</h4>
        </div>
      ))}
      <dialog
        open={dialogOpen}
        withClosebutton
        className="standard"
        onClose={() => setDialogOpen(false)}
        position={{ top: '15em', left: '30em' }}
      >
        <p size="sm" mb="xs" weight={500}>
          Find a friend
        </p>

        <div align="flex-end">
          <input
            type="text"
            value={friendInput}
            onChange={e => setFriendInput(e.target.value)}
            placeholder="Search for friends"
            sx={{ flex: 1 }}
          />
          <button className="standard" onClick={findFriends} disabled={friendInput.length < 1}>
            Search
          </button>
        </div>
        <div align="center">
          {friendResults?.map(user => (
            <UserCard user={user} />
          ))}
        </div>
      </dialog>
    </PageWrapper>
  );
};

export default FriendList;
