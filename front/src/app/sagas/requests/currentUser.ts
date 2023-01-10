import client from "../../../client";
import { GET_USER_DATA } from "../../graphql/queries";

//TODO: solve this any
export async function requestGetUser(): Promise<any> {
  return client.query({
    query: GET_USER_DATA,
    fetchPolicy: "no-cache",
  });
}
