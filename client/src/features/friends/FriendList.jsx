import { useState, useContext, useRef } from 'react';
import { useMutation } from '@apollo/client';
// import { ADD_FRIEND } from '.';
import { UserContext } from '../users';

import { PageWrapper } from '../../components';
import {
  ADD_FRIEND_REQUEST,
  CONFIRM_FRIEND_REQUEST,
  CANCEL_FRIEND_REQUEST,
  REMOVE_FRIEND,
} from './services/friendServices';
import { Link } from 'react-router-dom';

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

  const [addFriend] = useMutation(ADD_FRIEND_REQUEST, { variables: { friendIdentifier } });
  const [confirmRequest] = useMutation(CONFIRM_FRIEND_REQUEST);
  const [rejectRequest] = useMutation(CANCEL_FRIEND_REQUEST);
  const [removeFriend] = useMutation(REMOVE_FRIEND);
  const handleConfirmRequest = friendId => {
    console.log('confirm friend', friendId);
    confirmRequest({ variables: { friendId } });
  };
  const handleCancelRequest = friendId => {
    console.log('cancel friend', friendId);
    rejectRequest({ variables: { friendId } });
  };
  const handleRemoveFriend = friendId => {
    console.log('remove friend', friendId);
    removeFriend({ variables: { friendId } });
  };

  return (
    <PageWrapper
      title="My Friends"
      subtitle={
        <button className="standard" onClick={handleOpenDialog}>
          Add Friend
        </button>
      }
    >
      {friends.length > 0 ? (
        friends.map(friend => (
          <div key={friend._id}>
            <Link to={''}>
              <h4>{friend.username}</h4>
            </Link>
            <button
              className="standard"
              style={{ background: 'var(--danger)' }}
              onClick={() => {
                handleRemoveFriend(friend._id);
              }}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>Start making friends. Click 'Add Friend'.</p>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1em' }}>
        <div>
          <h2>Friend Requests</h2>
          {friendRequests?.length > 0 ? (
            friendRequests.map(friend => (
              <div
                key={friend._id}
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  background: 'var(--bg)',
                  padding: '.5em 1em',
                  alignItems: 'center',
                }}
              >
                <h4>{friend.username}</h4>
                <div>
                  <button
                    className="standard"
                    style={{ background: 'var(--success)' }}
                    onClick={() => {
                      handleConfirmRequest(friend._id);
                    }}
                  >
                    Accept
                  </button>
                  <button
                    className="standard"
                    style={{ background: 'var(--warning' }}
                    onClick={() => {
                      handleCancelRequest(friend._id);
                    }}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>You have no friend requests</p>
          )}
        </div>
        <div>
          <h2>Pending Requests</h2>
          {requestedFriends?.length > 0 ? (
            requestedFriends.map(friend => (
              <div
                key={friend._id}
                style={{
                  display: 'flex',
                  width: '100%',
                  justifyContent: 'space-between',
                  background: 'var(--bg)',
                  padding: '.5em 1em',
                  alignItems: 'center',
                }}
              >
                <h4>{friend.username}</h4>
                <button
                  className="standard"
                  style={{ background: 'var(--warning)' }}
                  onClick={() => handleCancelRequest(friend._id)}
                >
                  Cancel
                </button>
              </div>
            ))
          ) : (
            <p>You have no pending requests</p>
          )}
        </div>
      </div>
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
