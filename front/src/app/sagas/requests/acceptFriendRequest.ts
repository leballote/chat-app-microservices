import { gql } from "@apollo/client";
import client from "../../../client";

type AcceptFriendRequestInput = {
  userToAccept: string;
};

//TODO: solve this any
export async function acceptFriendRequest({
  userToAccept,
}: AcceptFriendRequestInput): Promise<any> {
  const ACCEPT_FRIEND_REQUEST = gql`
    mutation AcceptRequest($input: AcceptFriendshipInput!) {
      acceptFriendship(input: $input) {
        friendAdded {
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
    mutation: ACCEPT_FRIEND_REQUEST,
    variables: {
      input: {
        userToAccept,
      },
    },
  });
}
