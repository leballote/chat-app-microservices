import client from "../../../client";
import { GET_CHAT_DATA } from "../../graphql/queries";

//TODO: solve this any
export async function requestGetChat({
  chatId,
}: {
  chatId: string;
}): Promise<any> {
  return client.query({
    query: GET_CHAT_DATA,
    variables: {
      chatId,
    },
    fetchPolicy: "no-cache",
  });
}
