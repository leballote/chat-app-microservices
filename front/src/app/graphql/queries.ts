import { gql } from "@apollo/client";

export const GET_CHATS_PREVIEWS_DATA = gql`
  query GetChatPreviews {
    viewer {
      id
      chats {
        id
        type
        name
        avatar
        lastActionDate
        lastMessage {
          id
          content
          sentAt
          sentBy {
            id
          }
        }
      }
    }
  }
`;

export const GET_CONTACTS_PREVIEWS_DATA = gql`
  query GetContactsPreviews {
    viewer {
      id
      friends {
        id
        name
        avatar
        phrase
        status
        individualChat {
          id
        }
      }
    }
  }
`;

export const GET_CHAT_DATA = gql`
  query GetChat($chatId: String!) {
    viewer {
      id
      chat(chatId: $chatId) {
        viewerAsChatUser {
          id
          admin
          participantSince
        }
        id
        name
        type
        phrase
        avatar
        participants {
          participantSince
          admin
          id
          name
          phrase
          avatar
          individualChat {
            id
            type
            phrase
            name
            avatar
          }
        }
        messages {
          id
          sentBy {
            id
            avatar
            name
            status
          }
          sentAt
          content
        }
      }
    }
  }
`;

export const GET_USER_DATA = gql`
  query GetUser {
    viewer {
      id
      username
      email
      name
      phrase
      status
      avatar
      settings {
        language
      }
    }
  }
`;

export const GET_FRIENDS_REQUESTS_PREVIEWS = gql`
  query GetFriendRequests {
    friendshipRequestsReceived {
      user {
        id
        username
        name
        phrase
        avatar
      }
      sentAt
    }
  }
`;

export const GET_CHAT_PREVIEW_DATA = gql`
  query GetChatPreview($input: String!) {
    viewer {
      id
      chat(chatId: $input) {
        id
        type
        name
        avatar
        lastMessage {
          id
          content
          sentAt
          sentBy {
            id
          }
        }
      }
    }
  }
`;

export const GET_MORE_MESSAGES = gql`
  query GetMoreMessages($input: GetMessagesInput!) {
    messages(input: $input) {
      id
      content
      sentAt
      chat {
        id
      }
      sentBy {
        id
      }
    }
  }
`;
