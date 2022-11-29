import { gql } from "@apollo/client";
import client from "../../../client";

type RemoveFriendInput = {
  userToRemoveId: string;
};

//TODO: solve this any
export async function removeFriend({
  userToRemoveId,
}: RemoveFriendInput): Promise<any> {
  const REMOVE_FRIEND = gql`
    mutation RemoveFriendship($input: RemoveFriendshipInput!) {
      removeFriendship(input: $input) {
        userRemoved {
          id
          username
        }
      }
    }
  `;

  return await client.mutate({
    mutation: REMOVE_FRIEND,
    variables: {
      input: {
        userToRemoveId,
      },
    },
  });
}
