import client from "../../../client";
import { SEND_MESSAGE } from "../../graphql/mutations";

type MessageInput = {
  content: string;
  chatId: string;
  sentAt: string;
};

export async function requestSendMessage({
  content,
  chatId,
  sentAt,
}: MessageInput): Promise<any> {
  return await client.mutate({
    mutation: SEND_MESSAGE,
    variables: {
      input: {
        chatId,
        content,
        sentAt,
      },
    },
  });
}
