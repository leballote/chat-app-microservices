import { gql } from "@apollo/client";
import client from "../../../client";

//this should include a searcht term

//TODO: solve this any
export async function requestGetChatsPreviews(
  searchTerm: string
): Promise<any> {
  //in the query should be a search term
  const GET_CHATS_PREVIEWS_DATA = gql`
    query GetChatPreviews {
      viewer {
        chats {
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
  return client.query({
    query: GET_CHATS_PREVIEWS_DATA,
  });
}
