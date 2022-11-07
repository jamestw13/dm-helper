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
export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      firstname
      lastname

      characters {
        _id
        name
        color
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

export const QUERY_HEADER = gql`
  {
    me {
      firstname
      lastname
      avatar
    }
  }
`;
