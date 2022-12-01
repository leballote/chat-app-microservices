import { gql } from "@apollo/client";
import client from "../../../client";

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
  const ADD_PARTICIPANT = gql`
    mutation AddParticipants($input: AddParticipantsInput!) {
      addParticipants(input: $input) {
        chatModified {
          participants {
            id
            username
            name
            phrase
            status
            avatar
            admin
          }
        }
      }
    }
  `;

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
