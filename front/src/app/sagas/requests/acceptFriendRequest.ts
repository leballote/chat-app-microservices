import client from "../../../client";
import { ACCEPT_FRIEND_REQUEST } from "../../graphql/mutations";

type AcceptFriendRequestInput = {
  userToAccept: string;
};

//TODO: solve this any
export async function acceptFriendRequest({
  userToAccept,
}: AcceptFriendRequestInput): Promise<any> {
  return await client.mutate({
    mutation: ACCEPT_FRIEND_REQUEST,
    variables: {
      input: {
        userToAccept,
      },
    },
  });
}
