import { UserModelResponse } from "../types/apiResponse.types";

export function getReceiver(
  participants: UserModelResponse[],
  viewerId: string
) {
  const unWrappedReceiver = participants.filter((participant) => {
    console.log(receiver);
    return participant._id != viewerId;
  });
  const receiver = unWrappedReceiver[0];
  return receiver;
}

export function isStringArray(array: any[]): array is string[] {
  return typeof array[0] === "string";
}
