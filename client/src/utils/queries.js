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
        characters {
          name
        }
      }
    }
  }
`;

export const QUERY_ENCOUNTER = gql`
  query encounter($_id: ID) {
    encounter(_id: $_id) {
      title
      characters {
        name
        ac
        hp
        primaryColor
      }
      encounterLog {
        round
        turns {
          turn
          character {
            name
            ac
            hp
            primaryColor
          }
          statuses {
            condition
            duration
            startRound
            startTurn
          }
        }
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
