import client from "../../../client";
import { GET_CONTACTS_PREVIEWS_DATA } from "../../graphql/queries";

//this should include a searcht term

//TODO: solve this any
export async function requestGetContactsPreviews(
  searchTerm: string
): Promise<any> {
  //in the query should be a search term

  return client.query({
    query: GET_CONTACTS_PREVIEWS_DATA,
    fetchPolicy: "no-cache",
  });
}
