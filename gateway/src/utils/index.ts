import { UserModelSuccessResponse } from "../types/servicesRest";

export function getReceiver(
  participants: UserModelSuccessResponse[],
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
