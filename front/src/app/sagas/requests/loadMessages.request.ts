import client from "../../../client";
import { GET_MORE_MESSAGES } from "../../graphql/queries";
import { store } from "../../store";

export async function loadMessages(action?: {
  limit?: number;
  start?: string;
  offset?: number;
}): Promise<any> {
  const limit = action?.limit;
  const offset = action?.offset;
  const { messagesBatchSize, value } = store.getState().currentChat;
  return client.query({
    query: GET_MORE_MESSAGES,
    fetchPolicy: "no-cache",
    variables: {
      input: {
        chatId: value?.id,
        limit: limit ?? messagesBatchSize,
        start: value?.messages.at(-1)?.id,
        offset: offset,
      },
    },
  });
}
