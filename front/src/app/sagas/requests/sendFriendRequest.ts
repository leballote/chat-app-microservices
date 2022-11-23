import { gql } from "@apollo/client";
import client from "../../../client";

type SendFriendRequestInput = {
  userToAdd?: string;
  userToAddEmail?: string;
  userToAddUsername?: string;
};

//TODO: solve this any
export async function requestSendFriendRequest({
  userToAdd,
  userToAddEmail,
  userToAddUsername,
}: SendFriendRequestInput): Promise<any> {
  const SEND_FRIEND_REQUEST = gql`
    mutation ($input: RequestFriendshipInput!) {
      requestFriendship(input: $input) {
        friendAdded {
          id
          name
        }
      }
    }
  `;

  const variables: {
    input: SendFriendRequestInput;
  } = {
    input: {},
  };

  if (userToAdd) variables.input.userToAdd = userToAdd;
  if (userToAddEmail) variables.input.userToAddEmail = userToAddEmail;
  if (userToAddUsername) variables.input.userToAddUsername = userToAddUsername;

  console.log("VARIABLES", variables);
  return await client.mutate({
    mutation: SEND_FRIEND_REQUEST,
    variables,
  });
}
