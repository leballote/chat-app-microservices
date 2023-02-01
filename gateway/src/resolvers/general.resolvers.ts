import { ChatModelType, UserModelSuccessResponse } from "../types/servicesRest";
import { isErrorResponse, DataObject } from "../types/general.types";
import { getPropertyFromReceiver, isStringArray } from "../utils";
import { Resolvers, ChatType, Status } from "../generated/graphql";
import { authError, createGQLError } from "../errors/utils";

const resolvers: Resolvers = {
  Chat: {
    id: (parent) => {
      return parent._id;
    },
    type: (parent) => {
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
        throw authError;
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
    name: async (parent, _, context) => {
      const { dataSources } = context;
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw authError;
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
    avatar: async (parent, _, context) => {
      const { dataSources } = context;
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw authError;
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
    lastMessage: async (parent, _, { dataSources }) => {
      const messageRes = await dataSources.chatAPI.getMessages({
        limit: 1,
        chatId: parent._id,
      });

      if (isErrorResponse(messageRes)) {
        throw createGQLError(messageRes);
      }
      const [message] = messageRes.data;
      return message;
    },
    participants: async (parent, _, { dataSources }) => {
      //TODO: maybe put a route in the users service which can query by list of ids
      const participantsResponses = await Promise.all(
        parent.participants.map(async (participant) => {
          try {
            return await dataSources.userAPI.getUser(participant.id);
          } catch (e) {
            return Promise.resolve({ error: { message: "Something failed" } });
          }
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
    messages: async (parent, _, { dataSources }) => {
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw authError;
      }
      const viewerParticipantRes = await dataSources.chatAPI.getParticipant(
        parent._id,
        viewer._id
      );
      if (isErrorResponse(viewerParticipantRes)) {
        throw createGQLError(viewerParticipantRes);
      }
      const messagesRes = await dataSources.chatAPI.getMessages({
        afterDate: viewerParticipantRes.data.participantSince,
        chatId: parent._id,
        limit: 15,
      });
      if (isErrorResponse(messagesRes)) {
        throw createGQLError(messagesRes);
      }
      return messagesRes.data;
    },
    viewerAsChatUser: async (parent, _, { dataSources }) => {
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw authError;
      }
      const participantRes = await dataSources.chatAPI.getParticipant(
        parent._id,
        viewer._id
      );
      if (isErrorResponse(participantRes)) {
        throw createGQLError(participantRes);
      }
      //TODO: for some reason it is not allowing individualChat = null
      return {
        ...viewer,
        ...participantRes.data,
        status: null,
        id: viewer._id,
        individualChat: null,
      } as any;
    },
  },
  Message: {
    id: (parent) => {
      return parent._id;
    },
    chat: async (parent, _, { dataSources }) => {
      const chatRes = await dataSources.chatAPI.getChat(parent.chatId);
      if (isErrorResponse(chatRes)) {
        throw createGQLError(chatRes);
      }
      return chatRes.data;
    },
    sentBy: async (parent, {}, { dataSources }) => {
      const [
        userRes,
        //  participantRes
      ] = await Promise.all([
        dataSources.userAPI.getUser(parent.sentBy),
        // dataSources.chatAPI.getParticipant(parent.chatId, parent.sentBy),
      ]);
      if (isErrorResponse(userRes)) {
        throw createGQLError(userRes);
      }
      // if (isErrorResponse(participantRes)) {
      //   throw new GraphQLError(participantRes.error.message);
      // }

      const out: any = {
        ...userRes.data,
        // ...participantRes.data,
        status: Status.Online,
      };
      out.id = out._id;
      return out;
    },
  },

  ChatUser: {
    individualChat: async (parent, _, { dataSources }) => {
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw authError;
      }
      const chatRes = await dataSources.chatAPI.getChats({
        user1Id: viewer._id,
        user2Id: parent._id,
      });

      if (isErrorResponse(chatRes)) {
        throw createGQLError(chatRes);
      }
      return chatRes.data[0] ?? null;
    },
    status: () => {
      //TODO see how you are going to solve this
      return Status.Online;
    },
  },
  Viewer: {
    id: (parent) => {
      return parent._id;
    },
    friends: async (parent, _, { dataSources }) => {
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
    chats: async (_parent, _input, { dataSources }) => {
      const viewer = await dataSources.getViewer();
      const chatRes = await dataSources.chatAPI.getChats({
        userId: viewer._id,
      });
      if (isErrorResponse(chatRes)) {
        throw createGQLError(chatRes);
      }

      return chatRes.data;
    },
    chat: async (_, { chatId }, { dataSources }) => {
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw authError;
      }
      const chatRes = await dataSources.chatAPI.getChat(chatId, {
        userId: viewer._id,
      });
      if (isErrorResponse(chatRes)) {
        throw createGQLError(chatRes);
      }
      return chatRes.data;
    },
    status: () => {
      //TODO see how you are going to solve this
      return Status.Online;
    },
  },
  User: {
    id: (parent) => {
      return parent._id;
    },
    individualChat: async (parent, _, { dataSources }) => {
      const viewer = await dataSources.getViewer();
      if (!viewer) {
        throw authError;
      }
      const chatRes = await dataSources.chatAPI.getChats({
        user1Id: viewer._id,
        user2Id: parent._id,
      });
      console.log("chatRes", chatRes);

      if (isErrorResponse(chatRes)) {
        throw createGQLError(chatRes);
      }
      return chatRes.data[0] ?? null;
    },
    status: () => {
      //TODO see how you are going to solve this
      return Status.Online;
    },
  },
};

export default resolvers;
