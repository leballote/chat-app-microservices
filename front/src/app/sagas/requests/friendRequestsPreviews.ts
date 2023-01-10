import client from "../../../client";
import { GET_FRIENDS_REQUESTS_PREVIEWS } from "../../graphql/queries";

//this should include a searcht term

//TODO: solve this any
export async function requestGetFriendRequestsPreviews(): Promise<any> {
  //in the query should be a search term

  return client.query({
    query: GET_FRIENDS_REQUESTS_PREVIEWS,
    fetchPolicy: "no-cache",
  });
}
