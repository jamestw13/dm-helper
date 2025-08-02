import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate, Link } from 'react-router-dom';

import CharacterSheet from './CharacterSheet';

const Sheet = ({}) => {
  const { charId } = useParams();

  return <CharacterSheet charId={charId} />;
};
export default Sheet;
