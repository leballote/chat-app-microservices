import { PubSub } from "graphql-subscriptions";

export const MESSAGE_CREATED = "MESSAGE_CREATED";
export const FRIENDSHIP_REQUEST_RECEIVED = "FRIENDSHIP_REQUEST_RECEIVED";
export const FRIENDSHIP_RESPONSE_RECEIVED = "FRIENDSHIP_RESPONSE_RECEIVED";
export const CHAT_DELETED = "CHAT_DELETED";
export const FRIENDSHIP_REMOVED = "FRIENDSHIP_REMOVED";

export const pubsub = new PubSub();
