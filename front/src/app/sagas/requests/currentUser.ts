import { gql } from "@apollo/client";
import client from "../../../client";

const GET_USER_DATA = gql`
  query GetUser {
    viewer {
      id
      username
      name
      phrase
      status
      avatar
    }
  }
`;

//TODO: solve this any
export async function requestGetUser(): Promise<any> {
  return client.query({
    query: GET_USER_DATA,
    fetchPolicy: "no-cache",
  });
}
