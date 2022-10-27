export type Message = {
  id: string;
  sentBy: string;
  sentAt: string;
  content: string;
};

export type ChatUser = {
  id: string;
  name: string;
  admin: false;
  phrase: string;
  avatar: string;
  status: "online" | "offline";
};

export type Chat = {
  id: string;
  name: string;
  avatar?: string;
  status?: string;
  phrase?: string;
  type: "individual" | "group";
  participants: ChatUser[];
  messages: Message[];
};

export type ChatContextType = Omit<Chat, "messages">;

export type ChatDataResponse = {
  data: Chat;
};
