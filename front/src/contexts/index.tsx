import { createContext } from "react";
import { ChatContextType } from "../types/ChatSectionTypes";
import { User } from "../types/AppTypes";

export const ChatContext = createContext<ChatContextType>({
  id: "",
  name: "",
  phrase: "string",
  type: "INDIVIDUAL",
  status: "OFFLINE",
  participants: [],
});

export const CurrentUserContext = createContext<User>(null);
