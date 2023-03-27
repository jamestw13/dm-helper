import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      email
      firstname
      lastname
      avatar
      friends {
        _id
        username
        firstname
        lastname
      }
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
      friends {
        _id
        username
        firstname
        lastname
      }
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

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!, $firstname: String!, $lastname: String!) {
    addUser(username: $username, email: $email, password: $password, firstname: $firstname, lastname: $lastname) {
      token
      user {
        _id
        username
      }
    }
  }
`;
