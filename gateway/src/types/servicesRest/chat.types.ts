import { ParticipantInput } from "../../generated/graphql";
import { DefaultAPIResponse, DefaultError } from "./general.types";

export enum ChatModelType {
  INDIVIDUAL = "individual",
  GROUP = "group",
}

export type ChatParticipantSuccessResponse = {
  id: string;
  admin: boolean;
  participantSince: string;
};

export type ChatParticipantReseponse =
  DefaultAPIResponse<ChatModelSuccessResponse>;

//chat
export type ChatModelSuccessResponse = {
  _id: string;
  type: ChatModelType;
  name?: string;
  phrase?: string;
  createdAt: string;
  updatedAt: string;
  participants: ChatParticipantSuccessResponse[];
  avatar?: string;
};

export type ChatModelResponse = DefaultAPIResponse<ChatModelSuccessResponse>;

export type MessageModelSuccessResponse = {
  _id: string;
  chatId: string;
  sentAt: string;
  sentBy: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type MessageModelResponse =
  DefaultAPIResponse<MessageModelSuccessResponse>;

export type CreateMessageModelInput = {
  chatId: string;
  userId: string;
  sentAt: string;
  sentBy: string;
  content: string;
};

export type CreateGroupChatModelInput = {
  type: "group";
  name: string;
  avatar?: string;
  phrase: string;
  participants: ParticipantInput[];
};

export type CreateIndividualChatModelInput = {
  type: "individual";
  participants: ParticipantInput[];
};

export type CreateChatModelInput =
  | CreateGroupChatModelInput
  | CreateIndividualChatModelInput;

export function isGroupChatModelInput(input: CreateChatModelInput) {
  return input.type === "group";
}

export function isIndividualChatInput(input: CreateChatModelInput) {
  return input.type === "individual";
}
