import { DefaultAPIResponse, DefaultError } from "./general.types";

export enum ChatModelType {
  INDIVIDUAL = "individual",
  GROUP = "group",
}

//chat
export type ChatModelSuccessResponse = {
  _id: string;
  type: ChatModelType;
  name?: string;
  phrase?: string;
  createdAt: string;
  updatedAt: string;
  participants: string[];
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
  body: {
    chatId: string;
    userId: string;
    sentAt: string;
    sentBy: string;
    content: string;
  };
};
