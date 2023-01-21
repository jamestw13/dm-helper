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

export const QUERY_ENCOUNTER = gql`
  query encounter($_id: ID) {
    encounter(_id: $_id) {
      title
      characters {
        character {
          _id
          name
          ac
          currentHP
          primaryColor
        }
        initiative
      }
      effects {
        caster {
          name
          primaryColor
        }
        target {
          name
          primaryColor
        }
        startRound
        endRound
        startTurn
        endTurn
        effectName
        effectDescription
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
