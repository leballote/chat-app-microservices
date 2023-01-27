export type ResourcesTranslation = {
  user: string;
  user_plural?: string;
  chat: string;
  chat_plural?: string;
  message: string;
  message_plural: string;
  email: string;
  password: string;
  friendshipRequest: string;
};
export const resourcesResource: Record<
  "en" | "es" | "de",
  ResourcesTranslation
> = {
  es: {
    user: "El usuario",
    user_plural: "Los usuarios",
    chat: "La conversación",
    chat_plural: "Las conversaciones",
    message: "El mensaje",
    message_plural: "Los mensajes",
    email: "El correo electrónico",
    password: "La contraseña",
    friendshipRequest: "La solicitud de amistad",
  },
  en: {
    user: "User",
    user_plural: "Users",
    chat: "Chat",
    chat_plural: "Chats",
    message: "Message",
    message_plural: "Messages",
    email: "Email",
    password: "Password",
    friendshipRequest: "Friendship request",
  },
  de: {
    user: "Der Benutzer",
    user_plural: "Die Benutzer",
    chat: "Der Chat",
    chat_plural: "Die Chats",
    message: "Die Nachricht",
    message_plural: "Die Nachrichten",
    email: "Die Email",
    password: "Das Passwort",
    friendshipRequest: "Die Freundschaftsanfrage",
  },
};
