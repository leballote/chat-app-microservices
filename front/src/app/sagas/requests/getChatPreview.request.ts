import { gql } from "@apollo/client";
import { PayloadAction } from "@reduxjs/toolkit";
import client from "../../../client";

//this should include a searcht term
//TODO: solve this any
export async function requestGetChatPreview({
  payload,
}: PayloadAction<string>): Promise<any> {
  //in the query should be a search term
  const GET_CHAT_PREVIEW_DATA = gql`
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
  return client.query({
    query: GET_CHAT_PREVIEW_DATA,
    variables: {
      input: payload,
    },
  });
}
