import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate } from 'react-router-dom';

import { QUERY_USER, QUERY_ME } from '../utils/queries';
import './Profile.css';
import CharacterList from '../components/CharacterList';
import SheetContainer from '../components/SheetContainer';

import Auth from '../utils/auth';
import CampaignList from '../components/CampaignList';

const Profile = props => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  const [selectedChar, setSelectedChar] = useState([]);

  if (!Auth.loggedIn()) return <Navigate to='/' />;

  // redirect to person profile page if username is the logged-in user's
  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to='/profile' />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <div className=''>
        <h2 className=''>
          Viewing {userParam ? `${user.username}'s` : 'your'} profile
        </h2>
      </div>

      <section>
        <CharacterList chars={data?.me.characters} setChars={setSelectedChar} />
        <CampaignList campaigns={data?.me.campaigns} me={data?.me._id} />
      </section>
    </main>
  );
};

export default Profile;
