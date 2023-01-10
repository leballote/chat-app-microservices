import { gql } from "@apollo/client";

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation AcceptRequest($input: AcceptFriendshipInput!) {
    acceptFriendship(input: $input) {
      friendAdded {
        id
        username
        avatar
        phrase
        status
      }
    }
  }
`;

export const ADD_PARTICIPANT = gql`
  mutation AddParticipants($input: AddParticipantsInput!) {
    addParticipants(input: $input) {
      chatModified {
        participants {
          id
          username
          name
          phrase
          status
          avatar
          admin
        }
      }
    }
  }
`;

export const LEAVE_GROUP = gql`
  mutation LeaveGroup($input: LeaveGroupChatInput!) {
    leaveGroupChat(input: $input) {
      chatId
      success
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout {
      success
    }
  }
`;

export const REJECT_FRIEND_REQUEST = gql`
  mutation RejectRequest($input: RejectFriendshipInput!) {
    rejectFriendship(input: $input) {
      friendRejected {
        id
        username
        avatar
        phrase
        status
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation RemoveFriendship($input: RemoveFriendshipInput!) {
    removeFriendship(input: $input) {
      userRemoved {
        id
        username
      }
    }
  }
`;

export const REMOVE_PARTICIPANT = gql`
  mutation RemoveParticipant($input: RemoveParticipantInput!) {
    removeParticipant(input: $input) {
      chatId
      participantId
      success
    }
  }
`;

export const SEND_FRIEND_REQUEST = gql`
  mutation ($input: RequestFriendshipInput!) {
    requestFriendship(input: $input) {
      friendAdded {
        id
        name
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      message {
        id
        content
        sentAt
        sentBy {
          id
        }
      }
    }
  }
`;

export const GET_OR_CREATE_CHAT = gql`
  mutation GetOrCreateChat($input: GetOrCreateIndividualChatInput!) {
    getOrCreateIndividualChat(input: $input) {
      chat {
        id
        type
        phrase
        name
        avatar
      }
    }
  }
`;

export const CREATE_GROUP_CHAT = gql`
  mutation CreateGroupChat($input: CreateGroupChatInput!) {
    createGroupChat(input: $input) {
      chat {
        id
        type
        name
        phrase
        avatar
      }
    }
  }
`;

export const SET_LANGUAGE = gql`
  mutation SetLanguage($input: SetLanguageInput) {
    setLanguage(input: $input) {
      language
      success
    }
  }
`;

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
    }
  }
`;

export const SIGNUP = gql`
  mutation Signup($input: SignUpInput) {
    signup(input: $input) {
      success
    }
  }
`;
