import { gql } from "@apollo/client";

export const MESSAGE_CREATED = gql`
  subscription {
    messageCreated {
      message {
        id
        content
        sentAt
        sentBy {
          id
        }
        chat {
          id
        }
      }
    }
  }
`;

export const FRIENDSHIP_REQUEST_RECEIVED = gql`
  subscription FriendshipRequestReceived {
    friendshipRequestReceived {
      requesterUser {
        id
        name
        username
        avatar
        phrase
      }
      accepterUser {
        id
        name
        username
        avatar
        phrase
      }
    }
  }
`;
export const FRIENDSHIP_RESPONSE_RECEIVED = gql`
  subscription FriendshipResponseRecevied {
    friendshipResponseReceived {
      accepterUser {
        id
        name
        username
        avatar
        phrase
      }
      requesterUser {
        id
        name
        username
        avatar
        phrase
      }
      accept
    }
  }
`;

export const CHAT_REMOVED = gql`
  subscription ChatRemoved {
    chatRemoved {
      chatRemoved {
        id
        name
      }
    }
  }
`;
