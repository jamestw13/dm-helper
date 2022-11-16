import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate, useNavigate } from 'react-router-dom';

import './Profile.css';
import CharacterList from '../components/CharacterList';

import Auth from '../utils/auth';
import CampaignList from '../components/CampaignList';

import CharacterSheet from '../components/CharacterSheet';
import { Card } from '../components/Card';
import PageWrapper from '../components/PageWrapper';

const Profile = ({ data }) => {
  const navigate = useNavigate();
  const handleCharacterClick = charId => {
    navigate(`/sheet/${charId}`);
  };
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
    <PageWrapper title='Dashboard'>
      <section>
        <Card title='Character List'>
          <CharacterList
            chars={data?.characters}
            handleCharacterClick={handleCharacterClick}
            selectedCar={selectedChar}
            setSelectedChar={setSelectedChar}
          />
        </Card>
        {!!selectedChar && (
          <Card title='Character Sheet'>
            <CharacterSheet charId={selectedChar._id} />
          </Card>
        )}
        <Card title='Campaign List'>
          <CampaignList campaigns={data?.campaigns} me={data?._id} />
        </Card>
      </section>
    </PageWrapper>
  );
};

export default Profile;
