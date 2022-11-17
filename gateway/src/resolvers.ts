import { PubSub } from "graphql-subscriptions";
import {
  ChatModelType,
  UserModelSuccessResponse,
  DefaultAPIResponse,
} from "./types/servicesRest";
import { isErrorResponse, DataObject } from "./types/general.types";
import { getPropertyFromReceiver, getReceiver, isStringArray } from "./utils";
import { Resolvers, ChatType, Status } from "./generated/graphql";
import { withFilter } from "graphql-subscriptions";
import { CookieOptions } from "express";
import { create } from "domain";

const pubsub = new PubSub();
const MESSAGE_CREATED = "MESSAGE_CREATED";

const resolvers: Resolvers = {
  Query: {
    chats: async (_, args = {}, context) => {
      const { dataSources } = context;
      const chatRes = await dataSources.chatAPI.getChats(args);
      if (isErrorResponse(chatRes)) {
        //I think you are supposed to throw an error
        throw new Error(chatRes.error.message);
      } else {
        return chatRes.data;
      }
    },

    viewer: async (_, {}, { dataSources }) => {
      //TODO: here must be the authentication and the getting of the user, so theorethically we count with the user id
      const viewer_ = await dataSources.getViewer();
      return viewer_;
    },
  },

  Mutation: {
    signup: async (
      _,
      { input: { username, name, email, password } },
      { dataSources }
    ) => {
      //TODO: check if there is already a user with that username in auth or userRes, we'll mock it up right now
      //
      const alreadyUser = false;
      const alreadyAuthUser = false;
      if (alreadyAuthUser || alreadyUser) {
        throw new Error("This user already exists");
      }

      const authPostRes = await dataSources.authAPI.signUp({
        username,
        password,
      });
      if (isErrorResponse(authPostRes)) {
        throw new Error(authPostRes.error.message);
      }

      const userPostRes = await dataSources.userAPI.createUser({
        id: authPostRes.data.user._id,
        username,
        email,
        name,
      });
      if (isErrorResponse(userPostRes)) {
        dataSources.authAPI.deleteAuthUser(authPostRes.data.user._id);
        throw new Error(userPostRes.error.message);
      }
      return {
        success: true,
      };
    },

    login: async (_, { username, password }, { dataSources, req, res }) => {
      const authRes = await dataSources.authAPI.logIn({ username, password });
      const options: CookieOptions = {
        maxAge: 1000 * 60 * 60 * 24, //expires in a day
        httpOnly: true, // cookie is only accessible by the server
        // secure: process.env.NODE_ENV === "prod", // only transferred over https
        secure: true,
        sameSite: "none",
      };
      if (isErrorResponse(authRes)) {
        throw new Error(authRes.error.message);
      }
      res.cookie("jwt_token", authRes.data.token, options);
      return authRes.data;
    },
    //TODO: I am actually not sure if this needs to be done within the server or if I can clean the cookies directly in the browser
    logout: async (_, __, { res, req }) => {
      const options: CookieOptions = {
        maxAge: 1000 * 60 * 60 * 24, //expires in a day
        httpOnly: true, // cookie is only accessible by the server
        // secure: process.env.NODE_ENV === "prod", // only transferred over https
        secure: true,
        sameSite: "none",
      };
      res.clearCookie("jwt_token", options);
      return {
        success: true,
      };
    },

    createMessage: async (_, { input }, { dataSources }) => {
      const { chatId, content, sentAt, sentById } = input;
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw new Error("Not logged in user");
      }
      const createMessageRes = await dataSources.chatAPI.createMessage({
        chatId,
        userId: viewer._id,
        content,
        sentAt,
        sentBy: sentById,
      });
      if (isErrorResponse(createMessageRes)) {
        throw new Error(createMessageRes.error.message);
      }
      pubsub.publish(MESSAGE_CREATED, { messageCreated: createMessageRes });
      return { ...createMessageRes.data, success: true };
    },
    createGroupChat: async (_, { input }, { dataSources }) => {
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw new Error("Not authenticated");
      }
      const participantsAndViewer = input.participants;

      let friends = viewer.friends as UserModelSuccessResponse[];
      const friendsIds = friends.map((friend) => friend._id);

      for (const participant of participantsAndViewer) {
        if (!friendsIds.includes(participant.id)) {
          throw new Error("You can only chat with your friends");
        }
      }

      if (
        !participantsAndViewer
          .map((participant) => participant.id)
          .includes(viewer._id)
      ) {
        participantsAndViewer.push({ id: viewer._id, admin: true });
      }
      const createChatRes = await dataSources.chatAPI.createChat({
        type: "group",
        name: input.name,
        participants: participantsAndViewer,
        phrase: input.phrase,
        avatar: input?.avatar,
      });
      if (isErrorResponse(createChatRes)) {
        throw new Error(createChatRes.error.message);
      }
      return { chat: createChatRes.data };
    },
    getOrCreateIndividualChat: async (_, { input }, { dataSources }) => {
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw new Error("Not authenticated");
      }

      let friends = viewer.friends as UserModelSuccessResponse[];
      const friendsIds = friends.map((friend) => friend._id);

      if (!friendsIds.includes(input.userId)) {
        throw new Error("You can only chat with your friends");
      }

      const getChatRes = await dataSources.chatAPI.getChats({
        user1Id: viewer._id,
        user2Id: input.userId,
      });

      if (isErrorResponse(getChatRes)) {
        throw new Error(getChatRes.error.message);
      } else if (getChatRes.data.length > 0) {
        return { chat: getChatRes.data[0], created: false };
      }

      const createChatRes = await dataSources.chatAPI.createChat({
        type: "individual",
        participants: [
          { id: viewer._id, admin: false },
          { id: input.userId, admin: false },
        ],
      });

      if (isErrorResponse(createChatRes)) {
        throw new Error(createChatRes.error.message);
      }
      return { chat: createChatRes.data, created: true };
    },
  },

  Subscription: {
    messageCreated: {
      subscribe: async () => {
        return {
          [Symbol.asyncIterator]: withFilter(
            (args) => {
              return pubsub.asyncIterator([MESSAGE_CREATED]);
            },
            function filterMessageCreated(payload, variables, somethingElse) {
              console.log({ payload, variables, somethingElse });
              return true;
            }
          ),
        };
      },
    },
  },

  Chat: {
    id: (parent, {}, { dataSources }) => {
      return parent._id;
    },
    type: (parent) => {
      //TODO: this is probably not correct
      if (parent.type == ChatModelType.GROUP) {
        return ChatType.Group;
      } else {
        return ChatType.Individual;
      }
    },
    phrase: async (parent, _, context) => {
      const { dataSources } = context;
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw new Error("Not user logged in");
      }
      if (parent.type == "group") {
        return parent.phrase ?? "";
      } else {
        const phrase = (await getPropertyFromReceiver({
          participantsIds: parent.participants.map(
            (participant) => participant.id
          ),
          propertyName: "phrase",
          viewer: viewer,
          context,
        })) as UserModelSuccessResponse["phrase"];
        return phrase ?? "";
      }
    },
    name: async (parent, {}, context) => {
      const { dataSources } = context;
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw new Error("Not user logged in");
      }
      if (parent.type == "group") {
        return parent.name ?? "";
      } else {
        const name = (await getPropertyFromReceiver({
          participantsIds: parent.participants.map(
            (participant) => participant.id
          ),
          propertyName: "name",
          viewer: viewer,
          context,
        })) as UserModelSuccessResponse["name"];
        return name ?? "";
      }
    },
    avatar: async (parent, {}, context) => {
      const { dataSources } = context;
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw new Error("Not user logged in");
      }
      if (parent.type == "group") {
        return parent.avatar ?? "";
      } else {
        const avatar = (await getPropertyFromReceiver({
          participantsIds: parent.participants.map(
            (participant) => participant.id
          ),
          propertyName: "avatar",
          viewer: viewer,
          context,
        })) as UserModelSuccessResponse["avatar"];
        //I don't know why this is being typed as string and not string | undefined
        return avatar;
      }
    },
    lastMessage: async (parent, {}, { dataSources }) => {
      const messageRes = await dataSources.chatAPI.getMessages({ limit: 1 });

      if (isErrorResponse(messageRes)) {
        throw new Error(messageRes.error.message);
      }
      const [message] = messageRes.data;
      return message;
    },
    participants: async (parent, {}, { dataSources }) => {
      //TODO: maybe put a route in the users service which can query by list of ids
      const participantsResponses = await Promise.all(
        parent.participants.map(async (participant) => {
          return dataSources.userAPI.getUser(participant.id);
        })
      );
      const participantsDataObjects = participantsResponses.filter(
        (participantResponse) => !isErrorResponse(participantResponse)
      ) as DataObject<UserModelSuccessResponse>[];
      const participants = participantsDataObjects.map(
        (participantDataObject, index) => ({
          ...participantDataObject.data,
          ...parent.participants[index],
          status: Status.Online,
          participants: "",
        })
      );

      return participants as any;
    },
    messages: async (parent, {}, { dataSources }) => {
      const viewer = dataSources.getViewer();
      if (!viewer) {
        throw new Error("Not authenticated");
      }
      // const viewerParticipant = await dataSources.chatAPI.getParticipant();
      const messagesRes = await dataSources.chatAPI.getMessages({
        // afterDate: viewerParticipant.participantSince,
        chatId: parent._id,
      });
      if (isErrorResponse(messagesRes)) {
        throw new Error(messagesRes.error.message);
      }
      return messagesRes.data;
    },
  },
  Message: {
    id: (parent) => {
      return parent._id;
    },
    chat: async (parent, {}, { dataSources }) => {
      const chatRes = await dataSources.chatAPI.getChat(parent.chatId);
      if (isErrorResponse(chatRes)) {
        throw new Error(chatRes.error.message);
      }
      return chatRes.data;
    },
    sentBy: async (parent, {}, { dataSources }) => {
      const [userRes, participantRes] = await Promise.all([
        dataSources.userAPI.getUser(parent.sentBy),
        dataSources.chatAPI.getParticipant(parent._id, parent.sentBy),
      ]);
      if (isErrorResponse(userRes)) {
        throw new Error(userRes.error.message);
      }
      if (isErrorResponse(participantRes)) {
        throw new Error(participantRes.error.message);
      }

      const out = {
        ...userRes.data,
        ...participantRes.data,
        id: "0",
        status: Status.Online,
        admin: true,
        participantSince: "",
        chats: [],
      };
      return out as any;
    },
  },
  MessageCreatedSubscriptionResponse: {
    message: async (parent, {}, context) => {
      //TODO: change this type to the correct one
      const { user, dataSources } = context as any;
      if (!user) {
        throw new Error("Not authenticated");
      }
      const parentTemp = parent as any;
      const message = parentTemp.data;
      const chatRes = await dataSources.chatAPI.getChat(message.chatId);
      if (isErrorResponse(chatRes)) {
        throw new Error(chatRes.error.message);
      }
      const { participants } = chatRes.data;

      if (participants.includes(user._id)) {
        return message;
      } else {
        return null;
      }
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
        const usersResponses = await Promise.all(usersPromises);
        const usersDataObjects = usersResponses.filter(
          (userRespone) => !isErrorResponse(userRespone)
        ) as DataObject<UserModelSuccessResponse>[];
        const users = usersDataObjects.map(
          (userDataObject) => userDataObject.data
        );
        return users;
      } else {
        const friends = parent.friends as UserModelSuccessResponse[];
        return friends;
      }
    },
    chats: async (parent, {}, { dataSources }) => {
      const chatRes = await dataSources.chatAPI.getChats({
        userId: parent._id,
      });
      if (isErrorResponse(chatRes)) {
        throw new Error(chatRes.error.message);
      }
      return chatRes.data;
    },
    chat: async (parent, { chatId }, { dataSources }) => {
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw new Error("Not user logged in");
      }
      const chatRes = await dataSources.chatAPI.getChat(chatId, {
        userId: viewer._id,
      });
      if (isErrorResponse(chatRes)) {
        throw new Error(chatRes.error.message);
      }
      return chatRes.data;
    },
    status: (parent) => {
      //TODO see how you are going to solve this
      return Status.Online;
    },
  },
};

export default resolvers;
