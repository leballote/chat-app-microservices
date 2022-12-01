import { gql } from "@apollo/client";
import { PayloadAction } from "@reduxjs/toolkit";
import client from "../../../client";

const LEAVE_GROUP = gql`
  mutation LeaveGroup($input: LeaveGroupChatInput!) {
    leaveGroupChat(input: $input) {
      chatId
      success
    }
  }
`;

export async function leaveGroupRequest({
  payload,
}: PayloadAction<{ chatId: string }>) {
  const { chatId } = payload;
  const out = client.mutate({
    mutation: LEAVE_GROUP,
    variables: {
      input: {
        chatId,
      },
    },
  });
  client.resetStore();
  return out;
}
