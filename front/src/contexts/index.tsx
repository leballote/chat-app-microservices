import { createContext } from "react";
import { ChatContextType } from "../types/ChatSectionTypes";
import { User } from "../types/AppTypes";

export const ChatContext = createContext<ChatContextType>({
  id: "",
  name: "",
  type: "individual",
  participants: {}
});

export const CurrentUserContext = createContext<User>(null);
