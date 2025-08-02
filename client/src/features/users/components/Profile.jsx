import React, { useContext, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

import { Avatar } from '../../../components/Avatar';
import { QUERY_ME, QUERY_USER, UserContext } from '..';
import { ADD_CHARACTER } from '../../characters';

import { Section, PageWrapper } from '../../../components';
import Auth from '../../../utils/auth';

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
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Section title="Friends List">
          {user?.friends?.map(friend => (
            <div key={friend._id} onClick={() => handleFriendClick(friend._id)}>
              <div style={{ display: 'flex' }} align="center">
                <Avatar />
                <h4>{`${friend.firstname} ${friend.lastname}`}</h4>
              </div>
            </div>
          ))}
        </Section>
        <Section title="Character List">
          {user?.characters?.map(char => (
            <div key={char._id} onClick={() => handleCharacterClick(char._id)}>
              <h4 className="char-name">{char.name}</h4>
              <p className="char-encounter">
                {!!char.campaign && (char.isNPC ? `NPC in: ${char.campaign.name}` : `PC in: ${char.campaign.name}`)}
              </p>
            </div>
          ))}
        </Section>

        <Section title="Campaign List">
          {user?.campaigns?.map(campaign => (
            <div
              style={{ background: 'var(--bg-light)', margin: '.25rem', padding: '.25rem .75rem', borderRadius: '5px' }}
              key={campaign._id}
              onClick={() => handleCampaignClick(campaign._id)}
            >
              <h4 className="char-name">{campaign.name}</h4>
              <p className="char-encounter">{`DM: ${campaign?.owner?.username}`}</p>
            </div>
          ))}
        </Section>
      </div>
    </PageWrapper>
  );
};

export default Profile;
