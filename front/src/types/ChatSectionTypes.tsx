export type Message = {
  id: string;
  sentBy: { id: string };
  sentAt: string;
  content: string;
};

export type ChatUser = {
  id: string;
  name: string;
  admin: false;
  phrase: string;
  avatar: string;
  status: "ONLINE" | "OFFLINE";
};

export type Chat = {
  id: string;
  name: string;
  avatar?: string;
  status?: "ONLINE" | "OFFLINE"; //this one makes no sense try to take it away
  phrase: string;
  type: "INDIVIDUAL" | "GROUP";
  participants: ChatUser[];
  messages: Message[];
};

export type ChatContextType = Omit<Chat, "messages">;

export type ChatDataResponse = {
  data: Chat;
};
