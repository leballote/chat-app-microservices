import client from "../../../client";
import { REJECT_FRIEND_REQUEST } from "../../graphql/mutations";

type RejectFriendRequestInput = {
  userToReject: string;
};

//TODO: solve this any
export async function rejectFriendRequest({
  userToReject,
}: RejectFriendRequestInput): Promise<any> {
  return await client.mutate({
    mutation: REJECT_FRIEND_REQUEST,
    variables: {
      input: {
        userToReject,
      },
    },
  });
}
