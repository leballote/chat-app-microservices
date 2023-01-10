import client from "../../../client";
import { ADD_PARTICIPANT } from "../../graphql/mutations";

type AddParticipantInput = {
  chatId: string;
  participants: ParticipantInput[];
};

type ParticipantInput = {
  id: string;
  admin: boolean;
};

//TODO: solve this any
export async function addParticipants({
  chatId,
  participants,
}: AddParticipantInput): Promise<any> {
  return await client.mutate({
    mutation: ADD_PARTICIPANT,
    variables: {
      input: {
        chatId,
        participants,
      },
    },
  });
}
