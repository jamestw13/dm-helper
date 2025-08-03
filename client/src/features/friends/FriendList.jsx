import { useState, useContext, useRef } from 'react';
import { useMutation } from '@apollo/client';
// import { ADD_FRIEND } from '.';
import { UserContext } from '../users';

import { PageWrapper } from '../../components';
import { ADD_FRIEND_REQUEST } from './services/friendServices';

const FriendList = () => {
  const {
    user,
    user: { friends, friendRequests, requestedFriends },
  } = useContext(UserContext);

  const [friendIdentifier, setFriendIdentifier] = useState('');
  const dialogRef = useRef(null);

  const handleOpenDialog = () => {
    if (dialogRef.current) {
      dialogRef.current?.showModal();
    }
  };
  const handleCloseDialog = () => {
    dialogRef?.current.close();
  };

  const handleFriendClick = username => {};

  const [addFriend] = useMutation(ADD_FRIEND_REQUEST, { variables: { friendIdentifier } });

  return (
    <PageWrapper
      title="My Friends"
      subtitle={
        <button className="standard" onClick={handleOpenDialog}>
          Add Friend
        </button>
      }
    >
      {friends?.map(friend => (
        <div key={friend._id} onClick={() => handleFriendClick(friend.username)}>
          <h4>{friend.username}</h4>
        </div>
      ))}
      <h2>Friend Requests</h2>
      {friendRequests?.length > 0 ? (
        friendRequests.map(friend => (
          <div key={friend._id} onClick={() => handleFriendClick(friend.username)} style={{ display: 'flex' }}>
            <h4>{friend.username}</h4>

            <button className="standard" style={{ background: 'var(--success)' }}>
              Accept
            </button>
            <button className="standard" style={{ background: 'var(--warning' }}>
              Reject
            </button>
          </div>
        ))
      ) : (
        <p>You have no friend requests</p>
      )}
      <h2>Pending Requests</h2>
      {requestedFriends?.length > 0 ? (
        requestedFriends.map(friend => (
          <div key={friend._id} onClick={() => handleFriendClick(friend.username)} style={{ display: 'flex' }}>
            <h4>{friend.username}</h4>
            <button className="standard" style={{ background: 'var(--warning)' }}>
              Cancel
            </button>
          </div>
        ))
      ) : (
        <p>You have no pending requests</p>
      )}
      <dialog ref={dialogRef}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '5rem', marginBottom: '1rem' }}>
          <p style={{ gridColumn: 'span 2' }}>Enter your friend's username or email to send a friendship request</p>
          <button className="standard" onClick={handleCloseDialog}>
            Close
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1em' }}>
          <div style={{ display: 'grid', gridColumn: 'span 2', gridTemplateColumns: 'subgrid' }}>
            <div style={{ display: 'grid' }}>
              <p>Username or Email Address</p>
              <input
                type="text"
                value={friendIdentifier}
                onChange={e => setFriendIdentifier(e.target.value)}
                placeholder="Username or Email"
              />
            </div>
            <button className="standard" onClick={addFriend} disabled={friendIdentifier === ''}>
              Send Request
            </button>
          </div>
        </div>
      </dialog>
    </PageWrapper>
  );
};

export default FriendList;
