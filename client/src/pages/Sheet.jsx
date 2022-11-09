import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate, Link } from 'react-router-dom';

import './Profile.css';

import Auth from '../utils/auth';

import CharacterSheet from '../components/CharacterSheet';
import { Card } from '../components/Card';
import { QUERY_CHARACTER } from '../utils/queries';

const Sheet = ({}) => {
  const { charId } = useParams();

  return (
    <Card title='Character Sheet'>
      <Link to='/profile'>Go Back</Link>
      <CharacterSheet charId={charId} />
    </Card>
  );
};
export default Sheet;
