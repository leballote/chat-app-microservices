import { gql } from "@apollo/client";
import client from "../../../client";
import { Message as GQLMessage } from "../../../types/ChatSectionTypes";

type MessageInput = {
  content: string;
  chatId: string;
  sentBy: string;
  sentAt: string;
};

//TODO: solve this any
export async function requestSendMessage({
  content,
  chatId,
  sentBy,
  sentAt,
}: MessageInput): Promise<any> {
  const SEND_MESSAGE = gql`
    mutation CreateMessage($input: CreateMessageInput) {
      createMessage(input: $input) {
        message {
          content
          id
          sentAt
          sentBy {
            id
          }
        }
      }
    }
  `;
  return await client.mutate({
    mutation: SEND_MESSAGE,
    variables: {
      input: {
        chatId,
        content,
        sentAt,
        sentById: sentBy,
      },
    },
  });
}