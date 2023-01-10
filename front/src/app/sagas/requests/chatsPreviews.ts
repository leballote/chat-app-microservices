import client from "../../../client";
import { GET_CHATS_PREVIEWS_DATA } from "../../graphql/queries";

//this should include a searcht term

//TODO: solve this any
export async function requestGetChatsPreviews(
  searchTerm: string
): Promise<any> {
  //in the query should be a search term

  return client.query({
    query: GET_CHATS_PREVIEWS_DATA,
  });
}
