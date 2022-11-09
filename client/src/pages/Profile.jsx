import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate } from 'react-router-dom';

import './Profile.css';
import CharacterList from '../components/CharacterList';

import Auth from '../utils/auth';
import CampaignList from '../components/CampaignList';

import CharacterSheet from '../components/CharacterSheet';
import { Card } from '../components/Card';

const Profile = ({ data }) => {
  // const { username: userParam } = useParams();

  // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam },
  // });

  // const user = data?.me || data?.user || {};
  const [selectedChar, setSelectedChar] = useState('');

  if (!Auth.loggedIn()) return <Navigate to='/' />;

  // // redirect to person profile page if username is the logged-in user's
  // if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
  //   return <Navigate to='/profile' />;
  // }

  return (
    <>
      <h2 className=''>Dashboard</h2>

      <section>
        <CharacterList
          chars={data?.characters}
          selectedCar={selectedChar}
          setSelectedChar={setSelectedChar}
        />
        {!!selectedChar && (
          <Card title='Character Sheet'>
            <CharacterSheet charId={selectedChar._id} />
          </Card>
        )}
        <CampaignList campaigns={data?.campaigns} me={data?._id} />
      </section>
    </>
  );
};

export default Profile;
