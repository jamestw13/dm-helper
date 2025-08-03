import { gql } from '@apollo/client';

export const ADD_FRIEND_REQUEST = gql`
  mutation addFriendRequest($friendIdentifier: String!) {
    addFriend(friendIdentifier: $friendIdentifier)
  }
`;
export const CONFIRM_FRIEND_REQUEST = gql`
  mutation confirmFriendRequest($friendId: ID!) {
    confirmFriendRequest(friendId: $friendId)
  }
`;
export const CANCEL_FRIEND_REQUEST = gql`
  mutation cancelFriendRequest($friendId: ID!) {
    cancelFriendRequest(friendId: $friendId)
  }
`;
export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: ID!) {
    removeFriend(friendId: $friendId)
  }
`;
