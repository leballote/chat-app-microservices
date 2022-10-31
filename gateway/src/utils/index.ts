import { UserModelResponse } from "../types/apiResponse.types";

export function getReceiver(
  participants: UserModelResponse[],
  viewerId: string
) {
  const receiver = participants.filter((participant) => {
    return participant._id != viewerId;
  })[0];
  return receiver;
}

export function isStringArray(array: any[]): array is string[] {
  return typeof array[0] === "string";
}
