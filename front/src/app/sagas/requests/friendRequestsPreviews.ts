import { gql } from "@apollo/client";
import client from "../../../client";

//this should include a searcht term

//TODO: solve this any
export async function requestGetFriendRequestsPreviews(): Promise<any> {
  //in the query should be a search term
  const GET_FRIENDS_REQUESTS_PREVIEWS = gql`
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
  return client.query({
    query: GET_FRIENDS_REQUESTS_PREVIEWS,
    fetchPolicy: "no-cache",
  });
}
