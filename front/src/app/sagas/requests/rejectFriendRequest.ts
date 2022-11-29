import { gql } from "@apollo/client";
import client from "../../../client";

type RejectFriendRequestInput = {
  userToReject: string;
};

//TODO: solve this any
export async function rejectFriendRequest({
  userToReject,
}: RejectFriendRequestInput): Promise<any> {
  const REJECT_FRIEND_REQUEST = gql`
    mutation RejectRequest($input: RejectFriendshipInput!) {
      rejectFriendship(input: $input) {
        friendRejected {
          id
          username
          avatar
          phrase
          status
        }
      }
    }
  `;

  return await client.mutate({
    mutation: REJECT_FRIEND_REQUEST,
    variables: {
      input: {
        userToReject,
      },
    },
  });
}
