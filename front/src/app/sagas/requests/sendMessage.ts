import client from "../../../client";
import { SEND_MESSAGE } from "../../graphql/mutations";

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
