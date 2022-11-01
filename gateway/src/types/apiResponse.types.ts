export type Message = {
  id: string;
  sentBy: string;
  content: string;
  sentAt: string;
};

export type User = {
  id: string;
  username: string;
  name: string;
  birthDate: string;
  email: string;
  chats: string[] | Chat[];
  phrase: string;
  avatar: string;
  status: UserModelStatus;
  friends: string[] | User[];
};

export type Chat = {
  id: string;
  name: string;
  participants: string[] | User[];
  messages: string[] | Message[];
};

export type UserModelResponse = {
  _id: string;
  username: string;
  name: string;
  birthDate: string;
  email: string;
  phrase: string;
  avatar?: string;
  friends: string[] | UserModelResponse[];
  createdAt: string;
  updatedAt: string;
};

export enum ChatModelType {
  INDIVIDUAL = "individual",
  GROUP = "group",
}

export enum UserModelStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}

export type ChatModelResponse = {
  _id: string;
  type: ChatModelType;
  name?: string;
  phrase?: string;
  createdAt: string;
  updatedAt: string;
  participants: string[];
  avatar?: string;
};

export type MessageModelResponse = {
  _id: string;
  chatId: string;
  sentAt: string;
  sentBy: string;
  content: string;
};

export type CreateMessageModelInput = {
  chatId: string;
  userId: string;
  sentAt: string;
  sentBy: string;
  content: string;
};

export type LogInModelResponse = {
  success: boolean;
  token: string;
};

export type SignUpModelResponse = {
  success: boolean;
};
