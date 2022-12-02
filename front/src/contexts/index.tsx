import { createContext } from "react";
import { ChatContextType } from "../types/chat.types";
import { User } from "../types/user.types";

export const ChatContext = createContext<ChatContextType | null>(null);

export const CurrentUserContext = createContext<User>(null);
