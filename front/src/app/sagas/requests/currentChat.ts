import { gql } from "@apollo/client";
import client from "../../../client";

//TODO: solve this any
export async function requestGetChat(chatId: string): Promise<any> {
  const GET_CHAT_DATA = gql`
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
            }
            sentAt
            content
          }
        }
      }
    }
  `;
  return client.query({
    query: GET_CHAT_DATA,
    variables: {
      chatId: chatId,
    },
    fetchPolicy: "no-cache",
  });
}
