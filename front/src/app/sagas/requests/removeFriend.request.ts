import client from "../../../client";
import { REMOVE_FRIEND } from "../../graphql/mutations";

type RemoveFriendInput = {
  userToRemoveId: string;
};

//TODO: solve this any
export async function removeFriend({
  userToRemoveId,
}: RemoveFriendInput): Promise<any> {
  return await client.mutate({
    mutation: REMOVE_FRIEND,
    variables: {
      input: {
        userToRemoveId,
      },
    },
  });
}
