import { DefaultAPIResponse, DefaultError } from "./general.types";

export type UserModelSuccessResponse = {
  _id: string;
  username: string;
  name: string;
  birthDate: string;
  email: string;
  phrase: string;
  avatar?: string;
  friends: string[] | UserModelSuccessResponse[];
  createdAt: string;
  updatedAt: string;
  settings: {
    language: string;
  };
};

export type CreateUserModelInput = {
  id: string;
  username: string;
  name: string;
  birthDate?: string;
  email: string;
  prhase?: string;
  avatar?: string;
};

export type UpdateUserInput = {
  name?: string;
  avatar?: string;
  settings?: {
    language?: string;
  };
};

export type UserModelResponse = DefaultAPIResponse<UserModelSuccessResponse>;

export type FriendshipRequestSuccessResponse = {
  from: string;
  to: string;
  createdAt: string;
};

export type FriendshipSuccessResponse = {
  user1: string;
  user2: string;
};

export type FriendshipRequestResponse =
  DefaultAPIResponse<FriendshipRequestSuccessResponse>;

export type FriendshipResponse = DefaultAPIResponse<FriendshipSuccessResponse>;
