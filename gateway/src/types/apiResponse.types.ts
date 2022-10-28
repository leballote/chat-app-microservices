export type Message = {
  id: string;
  sentBy: string | User;
  content: string;
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
  status: Status;
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

export enum ChatType {
  INDIVIDUAL = "individual",
  GROUP = "group",
}

export enum Status {
  ONLINE = "online",
  OFFLINE = "offline",
}

export type ChatModelResponse = {
  _id: string;
  type: ChatType;
  name?: string;
  phrase?: string;
  createdAt: string;
  updatedAt: string;
  participants: string[];
};

export type MessageModelResponse = {
  _id: string;
  chatId: string;
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
