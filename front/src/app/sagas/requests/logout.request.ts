import client from "../../../client";
import { LOGOUT } from "../../graphql/mutations";

export async function logoutRequest(): Promise<any> {
  return client.mutate({
    mutation: LOGOUT,
  });
}
