import { gql } from '@apollo/client';

export const ADD_FRIEND = gql`
  mutation addFriend($me: ID!, $friend: ID!) {
    addFriend(me: $me, friend: $friend)
  }
`;

export const FIND_FRIENDS = gql`
  query friendSearch($searchTerm: String!) {
    friendSearch(searchTerm: $searchTerm) {
      username
      name
      avatar
    }
  }
`;
