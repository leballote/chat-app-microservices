export type Message = {
  id: string;
  sentBy: {
    id: string;
    name: string;
    avatar: string;
    status: boolean;
  };
  sentAt: string;
  content: string;
};

export interface ChatUser {
  id: string;
  name: string;
  admin: false;
  phrase: string;
  avatar?: string;
  status: "ONLINE" | "OFFLINE";
}

export type Chat = {
  id: string;
  name: string;
  avatar?: string;
  status?: "ONLINE" | "OFFLINE"; //this one makes no sense try to take it away
  phrase: string;
  type: "INDIVIDUAL" | "GROUP";
  participants: ChatUser[];
  messages: Message[];
  viewerAsChatUser: ChatUser;
};

export type ChatPreview = {
  id: string;
  type: "INDIVIDUAL" | "GROUP";
  name: string;
  avatar?: string;
  lastActionDate: string;
  lastMessage: {
    id: string;
    content: string;
    sentAt: string;
    sentBy: {
      id: string;
    };
  };
};

export type ChatDataResponse = {
  data: Chat;
};
