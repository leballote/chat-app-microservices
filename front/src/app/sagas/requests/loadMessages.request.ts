import { gql } from "@apollo/client";
import client from "../../../client";
import { store } from "../../store";

const GET_USER_DATA = gql`
  query GetUser($input: GetMessagesInput!) {
    messages(input: $input) {
      id
      content
      sentAt
      sentBy {
        id
      }
    }
  }
`;

//TODO: solve this any
export async function loadMessages(action?: {
  limit?: number;
  start?: string;
  offset?: number;
}): Promise<any> {
  const limit = action?.limit;
  const offset = action?.offset;
  const { messagesBatchSize, messagesNoBatch, value } =
    store.getState().currentChat;
  return client.query({
    query: GET_USER_DATA,
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
