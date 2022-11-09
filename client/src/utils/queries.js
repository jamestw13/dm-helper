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

export const QUERY_CHARACTER = gql`
  query character($_id: ID!) {
    character(_id: $_id) {
      _id
      name
      race
      class
      hitDice
      level
      background
      str
      dex
      con
      int
      wis
      cha
      strMod
      dexMod
      conMod
      intMod
      wisMod
      chaMod
      profBonus
      initMod
      initiative
      hp
      ac
      primaryColor
      secondaryColor
      isNPC
      campaign {
        _id
        name
      }
      user {
        firstname
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
