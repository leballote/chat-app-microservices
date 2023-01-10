import { PayloadAction } from "@reduxjs/toolkit";
import client from "../../../client";
import { LEAVE_GROUP } from "../../graphql/mutations";

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
