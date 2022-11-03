// TODO: I don't remember why I did these types, and I will address this later

enum UserStatus {
  ONLINE,
  OFFLINE,
}

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
  status: UserStatus;
  friends: string[] | User[];
};

export type Chat = {
  id: string;
  name: string;
  participants: string[] | User[];
  messages: string[] | Message[];
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

export enum UserModelStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}
