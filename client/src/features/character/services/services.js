import { gql } from '@apollo/client';

export const QUERY_CHARACTERS = gql`
  {
    characters {
      _id
      name
      primaryColor
      secondaryColor
      isNPC
      user {
        username
      }
      campaign {
        name
      }
    }
  }
`;
