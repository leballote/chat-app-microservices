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

export type ChatMeta = {
  id: string;
  name: string;
  avatar?: string;
  status?: string;
  phrase?: string;
  type: "individual" | "group";
};

export type Chat = {
  meta: ChatMeta;
  participants: {
    [userId: string]: ChatUser;
  };
  messages: Message[];
};

export type ChatContextType = {
  meta: ChatMeta;
  participants: {
    [userId: string]: ChatUser;
  };
};

export type ChatDataResponse = {
  data: Chat;
};
