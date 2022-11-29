import { gql } from "@apollo/client";
import client from "../../../client";

//this should include a searcht term

//TODO: solve this any
export async function requestGetContactsPreviews(
  searchTerm: string
): Promise<any> {
  //in the query should be a search term
  const GET_CONTACTS_PREVIEWS_DATA = gql`
    query GetContactsPreviews {
      viewer {
        id
        friends {
          id
          name
          avatar
          phrase
          status
          individualChat {
            id
          }
        }
      }
    }
  `;
  return client.query({
    query: GET_CONTACTS_PREVIEWS_DATA,
    fetchPolicy: "no-cache",
  });
}
