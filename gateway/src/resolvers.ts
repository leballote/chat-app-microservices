import { PubSub } from "graphql-subscriptions";
import {
  ChatModelResponse,
  UserModelResponse,
  MessageModelResponse,
  UserModelStatus,
  ChatModelType,
} from "./types/apiResponse.types";
import { getReceiver, isStringArray } from "./utils";
import { Resolvers, ChatType, Status } from "./generated/graphql";

const pubsub = new PubSub();
const MESSAGE_CREATED = "MESSAGE_CREATED";

const posts = [
  { author: "Luis", comment: "cool" },
  { author: "Jorge", comment: "great" },
];

const resolvers: Resolvers = {
  Query: {
    chats: async (_, args = {}, context) => {
      const { dataSources } = context;
      console.log("CONTEXT: ", context);
      const data = await dataSources.chatAPI.getChats(args);
      return data;
    },

    viewer: async (_, {}, { dataSources }) => {
      //TODO: here must be the authentication and the getting of the user, so theorethically we count with the user id
      const viewer_ = await dataSources.getViewer();
      return viewer_;
    },
  },

  Mutation: {
    signup: async (_, { username, password }, { dataSources }) => {
      //TODO: finish this mutation
      const res = await dataSources.authAPI.signUp({ username, password });
      return res;
    },

    login: async (_, { username, password }, { dataSources }) => {
      const res = await dataSources.authAPI.logIn({ username, password });
      return res;
    },

    createMessage: async (_, { input }, { dataSources }) => {
      const { chatId, content, sentAt, sentById } = input;
      const viewer = await dataSources.getViewer();
      const message = await dataSources.chatAPI.createMessage({
        chatId,
        userId: viewer._id,
        content,
        sentAt,
        sentBy: sentById,
      });
      pubsub.publish(MESSAGE_CREATED, { messageCreated: message });
      return message;
    },

    // createPost(parent, args, context) {
    //   posts.push(args);
    //   pubsub.publish("POST_CREATED", { postCreated: args });
    //   return args;
    // },
  },

  Subscription: {
    messageCreated: {
      subscribe: () => ({
        [Symbol.asyncIterator]: () => pubsub.asyncIterator([MESSAGE_CREATED]),
      }),
    },
    // postCreated: {
    //   subscribe: () => pubsub.asyncIterator(["POST_CREATED"]),
    // },
  },

  Chat: {
    id: (parent, {}, { dataSources }) => {
      return parent._id;
    },
    type: (parent: ChatModelResponse) => {
      //TODO: this is probably not correct
      if (parent.type == ChatModelType.GROUP) {
        return ChatType.Group;
      } else {
        return ChatType.Individual;
      }
    },
    phrase: async (parent: ChatModelResponse, _, { dataSources }) => {
      if (parent.type == "group") {
        return parent.phrase ?? "";
      } else {
        //TODO: this type should be infered
        const participants: UserModelResponse[] = await Promise.all(
          parent.participants.map((participantId) => {
            return dataSources.userAPI.getUser(participantId);
          })
        );
        const viewer = await dataSources.getViewer();
        const receiver = getReceiver(participants, viewer._id);
        return receiver.phrase ?? "";
      }
    },
    name: async (parent, {}, { dataSources }) => {
      if (parent.type == "group") {
        return parent.name ?? "";
      } else {
        //TODO: this also could be made with less roundtrips
        const participants: UserModelResponse[] = await Promise.all(
          parent.participants.map((participantId) => {
            return dataSources.userAPI.getUser(participantId);
          })
        );
        const viewer = await dataSources.getViewer();
        const receiver = getReceiver(participants, viewer._id);
        return receiver.name ?? "";
      }
    },
    avatar: async (parent, {}, { dataSources }) => {
      if (parent.type == "group") {
        return parent.avatar;
      } else {
        //TODO: this also could be made with less roundtrips
        const participants: UserModelResponse[] = await Promise.all(
          parent.participants.map((participantId) => {
            return dataSources.userAPI.getUser(participantId);
          })
        );
        const viewer = await dataSources.getViewer();
        const receiver = getReceiver(participants, viewer._id);
        return receiver.avatar;
      }
    },
    lastMessage: async (parent, {}, { dataSources }) => {
      const [message] = await dataSources.chatAPI.getMessages({ limit: 1 });
      return message;
    },
    participants: async (parent, {}, { dataSources }) => {
      //TODO: maybe put a route in the users service which can query by list of ids
      const participants_ = await Promise.all(
        parent.participants.map(async (participantId) => {
          return dataSources.userAPI.getUser(participantId);
        })
      );

      return participants_;
    },
    messages: (parent: ChatModelResponse, {}, { dataSources }) => {
      return dataSources.chatAPI.getMessages({ chatId: parent._id });
    },
  },
  Message: {
    id: (parent) => {
      return parent._id;
    },
    chat: async (parent, {}, { dataSources }) => {
      return dataSources.chatAPI.getChat(parent.chatId);
    },
    sentBy: (parent, {}, { dataSources }) => {
      console.log("it gets called");
      console.log(dataSources);
      return dataSources.userAPI.getUser(parent.sentBy);
    },
  },
  User: {
    id: (parent) => {
      return parent._id;
    },
    friends: async (parent, {}, { dataSources }) => {
      if (parent.friends.length == 0) {
        return [];
      }
      if (isStringArray(parent.friends)) {
        const usersPromises = parent.friends.map((friendId: string) => {
          const user = dataSources.userAPI.getUser(friendId);
          return user;
        });
        const users = await Promise.all(usersPromises);
        return users;
      } else {
        const friends = parent.friends as UserModelResponse[];
        return friends;
      }
    },
    chats: async (parent, {}, { dataSources }) => {
      return dataSources.chatAPI.getChats({ userId: parent._id });
    },
    chat: async (parent, { chatId }, { dataSources }) => {
      //TODO: again, getViewer needs to do a roundtrip which may be unecessary if all queries are using it
      return dataSources.chatAPI.getChat(chatId, {
        userId: (await dataSources.getViewer())._id,
      });
    },
    status: (parent) => {
      //TODO see how you are going to solve this
      return Status.Online;
    },
  },
};

export default resolvers;
