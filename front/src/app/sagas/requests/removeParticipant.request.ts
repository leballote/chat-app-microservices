import { PayloadAction } from "@reduxjs/toolkit";
import client from "../../../client";
import { REMOVE_PARTICIPANT } from "../../graphql/mutations";

export async function removeParticipant({
  payload,
}: PayloadAction<{ chatId: string; participantId: string }>) {
  const { chatId, participantId } = payload;
  return client.mutate({
    mutation: REMOVE_PARTICIPANT,
    variables: {
      input: {
        chatId,
        participantId,
      },
    },
  });
}
