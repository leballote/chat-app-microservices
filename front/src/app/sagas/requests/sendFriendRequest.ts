import client from "../../../client";
import { SEND_FRIEND_REQUEST } from "../../graphql/mutations";

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
  const variables: {
    input: SendFriendRequestInput;
  } = {
    input: {},
  };

  if (userToAdd) variables.input.userToAdd = userToAdd;
  if (userToAddEmail) variables.input.userToAddEmail = userToAddEmail;
  if (userToAddUsername) variables.input.userToAddUsername = userToAddUsername;

  return await client.mutate({
    mutation: SEND_FRIEND_REQUEST,
    variables,
  });
}
