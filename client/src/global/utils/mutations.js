import { gql } from '@apollo/client';

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
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CHARACTER = gql`
  mutation addCharacter($character: CharacterInput!) {
    addCharacter(character: $character) {
      _id
      name
      user {
        _id
      }
    }
  }
`;

export const ADD_NOTE = gql`
  mutation addNote($note: NoteInput!) {
    addNote(note: $note)
  }
`;
