import client from "../../../client";
import { GET_CHATS_PREVIEWS_DATA } from "../../graphql/queries";

//TODO: solve this any
export async function requestGetChatsPreviews(): Promise<any> {
  //in the query should be a search term

  return client.query({
    query: GET_CHATS_PREVIEWS_DATA,
  });
}
