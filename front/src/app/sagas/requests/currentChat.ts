import { gql } from "@apollo/client";
import client from "../../../client";

//TODO: solve this any
export async function requestGetChat(chatId: string): Promise<any> {
  const GET_CHAT_DATA = gql`
    query GetChat {
      viewer {
        chat(chatId: "${chatId}") {
          id
          name
          type
          phrase
          avatar
          participants {
            id
            name
            phrase
            avatar
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
  });
}
