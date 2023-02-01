import { gql } from '@apollo/client';

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

export const ADD_NOTE = gql`
  mutation addNote($note: NoteInput!) {
    addNote(note: $note)
  }
`;
