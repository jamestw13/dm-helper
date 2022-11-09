import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
    }
  }
`;

export const QUERY_USERS = gql`
  {
    users {
      _id
      username
      email
    }
  }
`;

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

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      firstname
      lastname
      avatar

      characters {
        _id
        name
        primaryColor
        secondaryColor
        isNPC

        campaign {
          name
        }
      }
      campaigns {
        _id
        name
        owner {
          _id
          username
        }
      }
    }
  }
`;
