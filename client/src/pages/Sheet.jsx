import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate, Link } from 'react-router-dom';

// import './Profile.css';

import Auth from '../utils/auth';

import CharacterSheet from '../features/characters/components/CharacterSheet';

import { QUERY_CHARACTER } from '../features/characters/services/services';
import PageWrapper from '../layouts/PageWrapper';

const Sheet = ({}) => {
  const { charId } = useParams();

  return (
    <PageWrapper title="Character Sheet">
      <div className="card">
        <CharacterSheet charId={charId} />
      </div>
    </PageWrapper>
  );
};
export default Sheet;
