import { gql } from "@apollo/client";
import client from "../../../client";

const LOGOUT = gql`
  mutation {
    logout {
      success
    }
  }
`;

export async function logoutRequest(): Promise<any> {
  return client.mutate({
    mutation: LOGOUT,
  });
}
