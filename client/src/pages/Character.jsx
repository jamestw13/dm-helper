import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useParams, Navigate, Link } from 'react-router-dom';

import { PageWrapper } from '../components';
import { CharacterSheet, QUERY_CHARACTER } from '../features/characters';

const Sheet = ({}) => {
  const { charId } = useParams();

  return (
    <PageWrapper title="Character Sheet">
      <CharacterSheet charId={charId} />
    </PageWrapper>
  );
};
export default Sheet;
