import { gql } from '@apollo/client';

export const ADD_FRIEND_REQUEST = gql`
  mutation addFriendRequest($friendIdentifier: String!) {
    addFriend(friendIdentifier: $friendIdentifier)
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
