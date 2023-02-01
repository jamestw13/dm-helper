import { gql } from '@apollo/client';

export const QUERY_CAMPAIGN = gql`
  query campaign($_id: ID) {
    campaign(_id: $_id) {
      name
      owner {
        username
        firstname
        lastname
      }
      players {
        firstname
        lastname
        avatar
        characters {
          _id
          name
          campaign {
            _id
          }
        }
      }
      characters {
        _id
        name
        class
        race

        primaryColor
        secondaryColor
        isNPC

        user {
          firstname
        }
      }
      encounters {
        _id
        title
        progress
        description
        characters {
          name
        }
      }
    }
  }
`;
