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
      avatar
      characters {
        name
      }
      campaigns {
        name
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
