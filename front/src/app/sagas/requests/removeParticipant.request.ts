import { gql } from "@apollo/client";
import { PayloadAction } from "@reduxjs/toolkit";
import client from "../../../client";

const REMOVE_PARTICIPANT = gql`
  mutation RemoveParticipant($input: RemoveParticipantInput!) {
    removeParticipant(input: $input) {
      chatId
      participantId
      success
    }
  }
`;

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
