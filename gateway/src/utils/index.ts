import { UserModelSuccessResponse } from "../types/servicesRest";
import { isErrorResponse, DataObject } from "../types/general.types";
import { MyContext } from "..";

interface WithId {
  id: string;
}

interface WithId2 {
  _id: string;
}

function hasId(participant: WithId | WithId2): participant is WithId {
  return (participant as WithId).id != null;
}

export function getReceiver<T>(
  participants: (T & WithId)[] | (T & WithId2)[],
  viewerId: string
): T {
  let receiver: (T & WithId) | (T & WithId2);
  if (hasId(participants[0])) {
    receiver = (participants as (T & WithId)[]).filter((participant) => {
      return participant.id != viewerId;
    })[0];
  } else {
    receiver = (participants as (T & WithId2)[]).filter((participant) => {
      return participant._id != viewerId;
    })[0];
  }
  return receiver;
}

export function isStringArray(array: any[]): array is string[] {
  return typeof array[0] === "string";
}

export async function getPropertyFromReceiver({
  participantsIds,
  propertyName,
  viewer,
  context,
}: {
  participantsIds: string[];
  propertyName: keyof UserModelSuccessResponse;
  viewer: UserModelSuccessResponse;
  context: MyContext;
}): Promise<UserModelSuccessResponse[typeof propertyName]> {
  const { dataSources } = context;

  const participantsResponse = await Promise.all(
    participantsIds.map((participantId) => {
      return dataSources.userAPI.getUser(participantId);
    })
  );

  //TODO: I don't know why the type is not infered from the filter
  const participantsDataObject = participantsResponse.filter(
    (el) => !isErrorResponse(el)
  ) as DataObject<UserModelSuccessResponse>[];

  const participants = participantsDataObject.map(
    (participantDataObject) => participantDataObject.data
  );
  const receiver = getReceiver(participants, viewer._id);
  return receiver[propertyName];
}
