import { UserModelSuccessResponse } from "../types/servicesRest";
import { isErrorResponse } from "../types/general.types";
import { MutationResolvers } from "../generated/graphql";
import { CookieOptions } from "express";
import {
  FRIENDSHIP_REQUEST_RECEIVED,
  FRIENDSHIP_RESPONSE_RECEIVED,
  MESSAGE_CREATED,
  pubsub,
} from "./actions";
import { GraphQLError } from "graphql";

const mutationRelatedResolvers: MutationResolvers = {
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
      throw new GraphQLError("This user already exists");
    }

    const authPostRes = await dataSources.authAPI.signUp({
      username,
      password,
    });

    if (isErrorResponse(authPostRes)) {
      throw new GraphQLError(authPostRes.error.message);
    }

    const userPostRes = await dataSources.userAPI.createUser({
      id: authPostRes.data.user._id,
      username,
      email,
      name,
    });
    if (isErrorResponse(userPostRes)) {
      dataSources.authAPI.deleteAuthUser(authPostRes.data.user._id);
      throw new GraphQLError(userPostRes.error.message);
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
      throw new GraphQLError(authRes.error.message);
    }
    res.cookie("jwt_token", authRes.data.token, options);
    return authRes.data;
  },
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
      throw new GraphQLError("Not logged in user");
    }
    const createMessageRes = await dataSources.chatAPI.createMessage({
      chatId,
      userId: viewer._id,
      content,
      sentAt,
      sentBy: sentById,
    });
    if (isErrorResponse(createMessageRes)) {
      throw new GraphQLError(createMessageRes.error.message);
    }
    pubsub.publish(MESSAGE_CREATED, { messageCreated: createMessageRes });
    const out = { message: createMessageRes.data, success: true };
    return out;
  },
  createGroupChat: async (_, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw new GraphQLError("Not authenticated");
    }
    const participantsAndViewer = input.participants;

    let friends = viewer.friends as UserModelSuccessResponse[];
    const friendsIds = friends.map((friend) => friend._id);

    for (const participant of participantsAndViewer) {
      if (!friendsIds.includes(participant.id)) {
        throw new GraphQLError("You can only chat with your friends");
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
      throw new GraphQLError(createChatRes.error.message);
    }
    return { chat: createChatRes.data };
  },
  getOrCreateIndividualChat: async (_, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw new GraphQLError("Not authenticated");
    }

    // let friends = viewer.friends as UserModelSuccessResponse[];
    // const friendsIds = friends.map((friend) => friend._id);

    // if (!friendsIds.includes(input.userId)) {
    //   throw new Error("You can only chat with your friends");
    // }

    const getChatRes = await dataSources.chatAPI.getChats({
      user1Id: viewer._id,
      user2Id: input.userId,
    });

    if (isErrorResponse(getChatRes)) {
      throw new GraphQLError(getChatRes.error.message);
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
      throw new GraphQLError(createChatRes.error.message);
    }
    return { chat: createChatRes.data, created: true };
  },
  requestFriendship: async (parent, { input }, { dataSources }) => {
    //TODO: simplify this, you made a mess!
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw new GraphQLError("Not authenticated");
    }
    const { userToAdd, userToAddEmail, userToAddUsername } = input;
    let queryByFields = { userToAdd, userToAddEmail, userToAddUsername };
    const queryByFieldsArray = Object.entries(queryByFields).filter(
      ([, val]) => val != null
    );
    //if there is more than one query field specified throw error
    if (queryByFieldsArray.length > 1) {
      throw new GraphQLError("Please specify only one query field");
    }
    const queryObject = Object.fromEntries(queryByFieldsArray) as {
      userToAdd?: string;
      userToAddEmail?: string;
      userToAddUsername?: string;
    };

    let userToAddId = userToAdd;
    if (queryObject.userToAddEmail) {
      const userToAddRes = await dataSources.userAPI.getUsers({
        email: userToAddEmail,
      });
      //this should never happen, it should allways return at least an empty array
      if (isErrorResponse(userToAddRes)) {
        throw new GraphQLError("Unexpected error");
      }
      if (userToAddRes.data.length == 0) {
        throw new GraphQLError("User with that email doesn't exist");
      }
      userToAddId = userToAddRes.data[0]._id;
    } else if (queryObject.userToAddUsername) {
      const userToAddRes = await dataSources.userAPI.getUsers({
        username: userToAddEmail,
      });
      //this should never happen, it should allways return at least an empty array
      if (isErrorResponse(userToAddRes)) {
        throw new GraphQLError("Unexpected error");
      }
      if (userToAddRes.data.length == 0) {
        throw new GraphQLError("User with that username doesn't exist");
      }
      userToAddId = userToAddRes.data[0]._id;
    }

    const friendRequestRes = await dataSources.userAPI.createFriendshipRequest({
      from: viewer._id,
      to: userToAddId,
    });
    if (isErrorResponse(friendRequestRes)) {
      throw new GraphQLError(friendRequestRes.error.message);
    }
    const userAddedRes = await dataSources.userAPI.getUser(userToAddId);
    if (isErrorResponse(userAddedRes)) {
      throw new GraphQLError(userAddedRes.error.message);
    }

    pubsub.publish(FRIENDSHIP_REQUEST_RECEIVED, {
      friendshipRequestReceived: {
        sender: viewer,
        receiver: userAddedRes.data,
      },
    });
    return {
      friendAdded: userAddedRes.data,
    };
  },
  acceptFriendship: async (parent, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw new GraphQLError("Not authenticated");
    }
    const friendshipRequestRes =
      await dataSources.userAPI.getFriendshipRequests({
        from: input.userToAccept,
        to: viewer._id,
      });

    if (isErrorResponse(friendshipRequestRes)) {
      throw new GraphQLError(friendshipRequestRes.error.message);
    }

    if (friendshipRequestRes.data.length == 0) {
      throw new GraphQLError("Friendship request not available");
    }

    const friendshipRes = await dataSources.userAPI.createFriendship({
      user1Id: viewer._id,
      user2Id: input.userToAccept,
    });
    if (isErrorResponse(friendshipRes)) {
      throw new GraphQLError(friendshipRes.error.message);
    }

    const userAddedRes = await dataSources.userAPI.getUser(input.userToAccept);

    if (isErrorResponse(userAddedRes)) {
      throw new GraphQLError(userAddedRes.error.message);
    }

    pubsub.publish(FRIENDSHIP_RESPONSE_RECEIVED, {
      friendshipResponseReceived: {
        sender: viewer,
        receiver: userAddedRes.data,
        accept: true,
      },
    });

    return {
      friendAdded: userAddedRes.data,
    };
  },
  rejectFriendship: async (parent, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw new GraphQLError("Not authenticated");
    }
    const friendshipRequestRes =
      await dataSources.userAPI.getFriendshipRequests({
        from: input.userToReject,
        to: viewer._id,
      });

    if (isErrorResponse(friendshipRequestRes)) {
      throw new GraphQLError(friendshipRequestRes.error.message);
    }

    if (friendshipRequestRes.data.length == 0) {
      throw new GraphQLError("Friendship request not available");
    }

    const friendshipRes = await dataSources.userAPI.deleteFriendshipRequest({
      from: input.userToReject,
      to: viewer._id,
    });

    if (isErrorResponse(friendshipRes)) {
      throw new GraphQLError(friendshipRes.error.message);
    }

    const userRejectedRes = await dataSources.userAPI.getUser(
      input.userToReject
    );

    if (isErrorResponse(userRejectedRes)) {
      throw new GraphQLError(userRejectedRes.error.message);
    }

    pubsub.publish(FRIENDSHIP_RESPONSE_RECEIVED, {
      friendshipResponseReceived: {
        sender: viewer,
        receiver: userRejectedRes.data,
        accept: false,
      },
    });

    return {
      friendRejected: userRejectedRes.data,
    };
  },
  setLanguage: async (parent, { input: { language } }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw new GraphQLError("Not authenticated");
    }
    const userRes = await dataSources.userAPI.updateUser(viewer._id, {
      settings: {
        language,
      },
    });
    if (isErrorResponse(userRes)) {
      throw new GraphQLError(userRes.error.message);
    }
    return { language: userRes.data.settings.language, success: true };
  },
  removeParticipant: async (parent, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw new GraphQLError("Not authenticated");
    }
    const viewerParticipantRes = await dataSources.chatAPI.getParticipant(
      input.chatId,
      viewer._id
    );
    if (isErrorResponse(viewerParticipantRes)) {
      throw new GraphQLError(viewerParticipantRes.error.message);
    }
    if (!viewerParticipantRes.data.admin) {
      throw new GraphQLError("Only admins can remove participants");
    }

    const delParticipantRes = await dataSources.chatAPI.deleteParticipant(
      input.chatId,
      input.participantId
    );

    if (isErrorResponse(delParticipantRes)) {
      throw new GraphQLError(delParticipantRes.error.message);
    }
    return {
      chatId: input.chatId,
      participantId: input.participantId,
      success: true,
    };
  },
  leaveGroupChat: async (parent, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw new GraphQLError("Not authenticated");
    }
    const delParticipantRes = await dataSources.chatAPI.deleteParticipant(
      input.chatId,
      viewer._id
    );

    if (isErrorResponse(delParticipantRes)) {
      throw new GraphQLError(delParticipantRes.error.message);
    }
    return {
      chatId: input.chatId,
      success: true,
    };
  },
  removeFriendship: async (parent, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw new GraphQLError("Not authenticated");
    }
    const friendhipRemoveRes = await dataSources.userAPI.deleteFriendship({
      user1Id: viewer._id,
      user2Id: input.userToRemoveId,
    });

    if (isErrorResponse(friendhipRemoveRes)) {
      throw new GraphQLError(friendhipRemoveRes.error.message);
    }

    const userToRemoveRes = await dataSources.userAPI.getUser(
      input.userToRemoveId
    );

    if (isErrorResponse(userToRemoveRes)) {
      throw new GraphQLError(userToRemoveRes.error.message);
    }

    return { userRemoved: userToRemoveRes.data };
  },
  addParticipants: async (_, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw new GraphQLError("Not authenticated");
    }
    const chatRes = await dataSources.chatAPI.addParticipants({
      chatId: input.chatId,
      participants: input.participants,
    });

    if (isErrorResponse(chatRes)) {
      throw new GraphQLError(chatRes.error.message);
    }

    return {
      chatModified: chatRes.data,
    };
  },
};

export default { Mutation: mutationRelatedResolvers };
