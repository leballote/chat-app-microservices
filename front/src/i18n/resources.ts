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
    user: "usuario",
    user_plural: "usuarios",
    chat: "conversación",
    chat_plural: "conversaciones",
    message: "mensaje",
    message_plural: "mensajes",
    email: "correo electrónico",
    password: "contraseña",
    friendshipRequest: "solicitud de amistad",
  },
  en: {
    user: "user",
    user_plural: "users",
    chat: "chat",
    chat_plural: "chats",
    message: "message",
    message_plural: "messages",
    email: "email",
    password: "password",
    friendshipRequest: "friendship request",
  },
  de: {
    user: "user",
    user_plural: "users",
    chat: "chat",
    chat_plural: "chats",
    message: "message",
    message_plural: "messages",
    email: "email",
    password: "password",
    friendshipRequest: "friendship request",
  },
};
