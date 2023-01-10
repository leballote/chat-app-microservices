import { PayloadAction } from "@reduxjs/toolkit";
import client from "../../../client";
import { GET_CHAT_PREVIEW_DATA } from "../../graphql/queries";

//this should include a searcht term
//TODO: solve this any
export async function requestGetChatPreview({
  payload,
}: PayloadAction<string>): Promise<any> {
  //in the query should be a search term

  return client.query({
    query: GET_CHAT_PREVIEW_DATA,
    variables: {
      input: payload,
    },
  });
}
