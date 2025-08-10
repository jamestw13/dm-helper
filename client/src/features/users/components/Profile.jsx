import React, { useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

import { Avatar } from '../../../components/Avatar';
import { QUERY_ME, QUERY_USER, UserContext } from '..';
import { ADD_CHARACTER } from '../../characters';

import { PageWrapper } from '../../../components';
import Auth from '../../../utils/auth';
import UserCard from './UserCard';
import CharacterCard from './CharacterCard';
import CampaignCard from './CampaignCard';

const Profile = () => {
  const { user, loggedIn } = useContext(UserContext);

  if (!loggedIn) return <Navigate to="/" />;
  const navigate = useNavigate();

  const { userId: userParam } = useParams();

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

  const handleNewCharSubmit = e => {};

  const handleCampaignClick = campaignId => {
    return navigate(`/campaign/${campaignId}`);
  };
  return (
    <PageWrapper title={user.firstname ? `${user.firstname || ''} ${user.lastname || ''}` : user.username}>
      <div style={{ display: 'grid', gap: '1rem' }}>
        <div className="section-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>My Friends</h2>
            <button className="standard" onClick={() => {}}>
              Add Character
            </button>
          </div>
          {user?.friends?.map(friend => (
            <UserCard user={friend} key={friend._id} />
          ))}
        </div>

        <div className="section-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>My Characters</h2>
            <button className="standard" onClick={() => {}}>
              Add Character
            </button>
          </div>
          {user?.characters?.map(char => (
            <CharacterCard character={char} key={char._id} />
          ))}
        </div>

        <div className="section-container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2>My Campaigns</h2>
            <button className="standard" onClick={() => {}}>
              Add Campaign
            </button>
          </div>
          {user?.campaigns?.map(campaign => (
            <CampaignCard campaign={campaign} key={campaign._id} onClick={() => handleCampaignClick(campaign._id)} />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Profile;
