import { UserModelSuccessResponse } from "../types/servicesRest";
import { isErrorResponse } from "../types/general.types";
import { MutationResolvers } from "../generated/graphql";
import { CookieOptions } from "express";
import { appCookieOptions } from "../options";

import {
  FRIENDSHIP_REQUEST_RECEIVED,
  FRIENDSHIP_RESPONSE_RECEIVED,
  CHAT_DELETED,
  MESSAGE_CREATED,
  pubsub,
  FRIENDSHIP_REMOVED,
} from "./actions";
import { GraphQLError } from "graphql";
import { authError, createGQLError } from "../errors/utils";

const mutationRelatedResolvers: MutationResolvers = {
  signup: async (
    _,
    { input: { username, name, email, password } },
    { dataSources }
  ) => {
    const authPostRes = await dataSources.authAPI.signUp({
      username,
      password,
    });

    if (isErrorResponse(authPostRes)) {
      throw createGQLError(authPostRes);
    }

    const userPostRes = await dataSources.userAPI.createUser({
      id: authPostRes.data.user._id,
      username,
      email,
      name,
    });
    if (isErrorResponse(userPostRes)) {
      dataSources.authAPI.deleteAuthUser(authPostRes.data.user._id);
      throw createGQLError(userPostRes);
    }
    return {
      success: true,
    };
  },

  login: async (_, { username, password }, { dataSources, req, res }) => {
    const authRes = await dataSources.authAPI.logIn({ username, password });
    const options: CookieOptions = appCookieOptions;
    if (isErrorResponse(authRes)) {
      throw createGQLError(authRes);
    }
    res.cookie("jwt_token", authRes.data.token, options);
    return authRes.data;
  },
  logout: async (_, __, { res, req }) => {
    const options: CookieOptions = appCookieOptions;
    res.clearCookie("jwt_token", options);
    return {
      success: true,
    };
  },

  createMessage: async (_, { input }, { dataSources }) => {
    const { chatId, content, sentAt } = input;
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw authError;
    }

    // if this doesn't error it means it is part of the chat
    const participantChatRes = await dataSources.chatAPI.getParticipant(
      chatId,
      viewer._id
    );

    if (isErrorResponse(participantChatRes)) {
      throw createGQLError(participantChatRes);
    }

    const createMessageRes = await dataSources.chatAPI.createMessage({
      chatId,
      userId: viewer._id,
      content,
      sentAt,
      sentBy: viewer._id,
    });

    if (isErrorResponse(createMessageRes)) {
      throw createGQLError(createMessageRes);
    }
    pubsub.publish(MESSAGE_CREATED, {
      messageCreated: createMessageRes,
      viewer,
    });
    const out = { message: createMessageRes.data, success: true };
    return out;
  },
  createGroupChat: async (_, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw authError;
    }
    const participantsAndViewer = input.participants;

    let friends = viewer.friends as UserModelSuccessResponse[];
    const friendsIds = friends.map((friend) => friend._id);
    if (!friendsIds) {
      throw new GraphQLError(
        "You can only chat with users that are friends of you",
        {
          extensions: {
            code: "NOT_FRIEND_WITH_USER",
          },
        }
      );
    }

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
      throw createGQLError(createChatRes);
    }
    return { chat: createChatRes.data };
  },
  getOrCreateIndividualChat: async (_, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();

    if (!viewer) {
      throw authError;
    }

    let friends = viewer.friends as UserModelSuccessResponse[];
    const friendsIds = friends.map((friend) => friend._id);
    if (!friendsIds.includes(input.userId)) {
      throw new GraphQLError(
        "You can only chat with users that are friends of you",
        {
          extensions: {
            code: "NOT_FRIENDS_WITH_USER",
          },
        }
      );
    }

    const getChatRes = await dataSources.chatAPI.getChats({
      user1Id: viewer._id,
      user2Id: input.userId,
    });

    if (isErrorResponse(getChatRes)) {
      throw createGQLError(getChatRes);
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
      throw createGQLError(createChatRes);
    }
    return { chat: createChatRes.data, created: true };
  },
  requestFriendship: async (_parent, { input }, { dataSources }) => {
    //TODO: simplify this, you made a mess!
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw authError;
    }
    const { userToAdd, userToAddEmail, userToAddUsername } = input;
    let queryByFields = { userToAdd, userToAddEmail, userToAddUsername };
    const queryByFieldsArray = Object.entries(queryByFields).filter(
      ([, val]) => val != null
    );
    //if there is more than one query field specified throw error
    if (queryByFieldsArray.length > 1) {
      throw new GraphQLError("Please specify only one query field", {
        extensions: {
          code: "QUERY_ERROR",
        },
      });
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
      if (isErrorResponse(userToAddRes)) {
        throw new GraphQLError("Unexpected error", {
          extensions: {
            code: "SERVER_ERROR",
          },
        });
      }
      if (userToAddRes.data.length == 0) {
        throw new GraphQLError("User with that email doesn't exist", {
          extensions: {
            code: "NOT_FOUND_ERROR",
            meta: {
              resource: "user",
              email: userToAddEmail,
            },
          },
        });
      }
      userToAddId = userToAddRes.data[0]._id;
    } else if (queryObject.userToAddUsername) {
      const userToAddRes = await dataSources.userAPI.getUsers({
        username: userToAddEmail,
      });
      //this should never happen, it should allways return at least an empty array
      if (isErrorResponse(userToAddRes)) {
        throw new GraphQLError("Unexpected error", {
          extensions: {
            code: "SERVER_ERROR",
          },
        });
      }
      if (userToAddRes.data.length == 0) {
        throw new GraphQLError("User with that username doesn't exist", {
          extensions: {
            code: "NOT_FOUND",
            meta: {
              username: userToAddUsername,
            },
          },
        });
      }
      userToAddId = userToAddRes.data[0]._id;
    }

    const friendRequestRes = await dataSources.userAPI.createFriendshipRequest({
      from: viewer._id,
      to: userToAddId,
    });
    if (isErrorResponse(friendRequestRes)) {
      throw createGQLError(friendRequestRes);
    }
    const userAddedRes = await dataSources.userAPI.getUser(userToAddId);
    if (isErrorResponse(userAddedRes)) {
      throw createGQLError(userAddedRes);
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
  acceptFriendship: async (_parent, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw authError;
    }
    const friendshipRequestRes =
      await dataSources.userAPI.getFriendshipRequests({
        from: input.userToAccept,
        to: viewer._id,
      });

    if (isErrorResponse(friendshipRequestRes)) {
      throw createGQLError(friendshipRequestRes);
    }

    if (friendshipRequestRes.data.length == 0) {
      throw new GraphQLError("Friendship request not available", {
        extensions: {
          code: "NOT_FOUND_ERROR",
        },
      });
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
  rejectFriendship: async (_parent, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw authError;
    }
    const friendshipRequestRes =
      await dataSources.userAPI.getFriendshipRequests({
        from: input.userToReject,
        to: viewer._id,
      });

    if (isErrorResponse(friendshipRequestRes)) {
      throw createGQLError(friendshipRequestRes);
    }

    if (friendshipRequestRes.data.length == 0) {
      throw new GraphQLError("Friendship request not available", {
        extensions: {
          code: "NOT_FOUND_ERROR",
          meta: {
            resource: "friendshipRequest",
            from: input.userToReject,
            to: viewer._id,
          },
        },
      });
    }

    const friendshipRes = await dataSources.userAPI.deleteFriendshipRequest({
      from: input.userToReject,
      to: viewer._id,
    });

    if (isErrorResponse(friendshipRes)) {
      throw createGQLError(friendshipRes);
    }

    const userRejectedRes = await dataSources.userAPI.getUser(
      input.userToReject
    );

    if (isErrorResponse(userRejectedRes)) {
      throw createGQLError(userRejectedRes);
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
  setLanguage: async (_parent, { input: { language } }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw authError;
    }
    const userRes = await dataSources.userAPI.updateUser(viewer._id, {
      settings: {
        language,
      },
    });
    if (isErrorResponse(userRes)) {
      throw createGQLError(userRes);
    }
    return { language: userRes.data.settings.language, success: true };
  },
  removeParticipant: async (_parent, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw authError;
    }
    const viewerParticipantRes = await dataSources.chatAPI.getParticipant(
      input.chatId,
      viewer._id
    );
    if (isErrorResponse(viewerParticipantRes)) {
      throw createGQLError(viewerParticipantRes);
    }
    if (!viewerParticipantRes.data.admin) {
      throw new GraphQLError("Only admins can remove participants", {
        extensions: {
          code: "AUTHORIZATION_ERROR",
          meta: {
            userId: viewer._id,
          },
        },
      });
    }

    const delParticipantRes = await dataSources.chatAPI.deleteParticipant(
      input.chatId,
      input.participantId
    );

    if (isErrorResponse(delParticipantRes)) {
      throw createGQLError(delParticipantRes);
    }
    return {
      chatId: input.chatId,
      participantId: input.participantId,
      success: true,
    };
  },
  leaveGroupChat: async (_parent, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw authError;
    }

    const delParticipantRes = await dataSources.chatAPI.deleteParticipant(
      input.chatId,
      viewer._id
    );

    if (isErrorResponse(delParticipantRes)) {
      throw createGQLError(delParticipantRes);
    }

    //this could be found at the same time that you delete a participant
    const chatToCheckRes = await dataSources.chatAPI.getChat(input.chatId);
    if (!isErrorResponse(chatToCheckRes)) {
      if (chatToCheckRes.data.participants.length === 0) {
        await dataSources.chatAPI.deleteChat(chatToCheckRes.data._id);
      }
    }

    return {
      chatId: input.chatId,
      success: true,
    };
  },
  removeFriendship: async (_parent, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw authError;
    }
    const friendhipRemoveRes = await dataSources.userAPI.deleteFriendship({
      user1Id: viewer._id,
      user2Id: input.userToRemoveId,
    });

    if (isErrorResponse(friendhipRemoveRes)) {
      throw createGQLError(friendhipRemoveRes);
    }

    const userToRemoveRes = await dataSources.userAPI.getUser(
      input.userToRemoveId
    );

    if (isErrorResponse(userToRemoveRes)) {
      throw createGQLError(userToRemoveRes);
    }

    const payload = {
      remover: viewer,
      removed: userToRemoveRes.data,
    };
    console.log("payload for friendship removed", payload);
    pubsub.publish(FRIENDSHIP_REMOVED, {
      friendshipRemoved: {
        remover: viewer,
        removed: userToRemoveRes.data,
      },
    });

    //SUGGESTION: I believe I should be able to remove chat by userId
    const chatsToRemoveRes = await dataSources.chatAPI.getChats({
      user1Id: userToRemoveRes.data._id,
      user2Id: viewer._id,
      type: "individual",
    });

    if (!isErrorResponse(chatsToRemoveRes)) {
      const chatToRemove = chatsToRemoveRes.data[0];
      const chatDeletedRes = await dataSources.chatAPI.deleteChat(
        chatToRemove._id
      );
      if (!isErrorResponse(chatDeletedRes)) {
        pubsub.publish(CHAT_DELETED, {
          chatRemoved: chatDeletedRes.data,
        });
      }
    }

    return { userRemoved: userToRemoveRes.data };
  },
  addParticipants: async (_, { input }, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw authError;
    }

    const chatRes = await dataSources.chatAPI.addParticipants({
      chatId: input.chatId,
      participants: input.participants.filter((friend) => {
        if (typeof viewer.friends[0] == "string") {
          return (viewer.friends as string[]).includes(friend.id);
        } else {
          return (viewer.friends as UserModelSuccessResponse[])
            .map((friend) => friend._id)
            .includes(friend.id);
        }
      }),
    });

    if (isErrorResponse(chatRes)) {
      throw createGQLError(chatRes);
    }

    return {
      chatModified: chatRes.data,
    };
  },
};

export default { Mutation: mutationRelatedResolvers };
