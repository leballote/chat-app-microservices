import { UserModelSuccessResponse } from "../types/servicesRest";
import { isErrorResponse, DataObject } from "../types/general.types";
import { QueryResolvers } from "../generated/graphql";

import { GraphQLError } from "graphql";

const queryRelatedResolvers: QueryResolvers = {
  user: async (_, { input }, { dataSources }) => {
    const { userId } = input;
    const userRes = await dataSources.userAPI.getUser(userId);
    if (isErrorResponse(userRes)) {
      throw new GraphQLError(userRes.error.message);
    }
    return userRes.data;
  },

  messages: async (_, { input }, { dataSources, req, res }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw new GraphQLError("Not authenticated");
    }
    const messagesRes = await dataSources.chatAPI.getMessages({
      userId: viewer._id,
      ...input,
    });
    if (isErrorResponse(messagesRes)) {
      throw new GraphQLError(messagesRes.error.message);
    }
    return messagesRes.data;
  },

  viewer: async (_, {}, { dataSources }) => {
    const viewer_ = await dataSources.getViewer();
    return viewer_;
  },
  friendshipRequestsReceived: async (_parent, _input, { dataSources }) => {
    const viewer = await dataSources.getViewer();
    if (!viewer) {
      throw new GraphQLError("Not authenticated");
    }
    const friendRes = await dataSources.userAPI.getFriendshipRequests({
      to: viewer._id,
    });
    if (isErrorResponse(friendRes)) {
      throw new GraphQLError(friendRes.error.message);
    }

    const promises = friendRes.data.map(async (friendReq) =>
      dataSources.userAPI.getUser(friendReq.from)
    );

    const promisesRes = await Promise.all(promises);
    const mergedRes = friendRes.data.map((friendReq, index) => ({
      friendReq,
      userRes: promisesRes[index],
    }));
    console.log("PROMISES RES WITH FRIENDSHIP DATA", mergedRes);
    const notErroredRes = mergedRes.filter(
      ({ userRes }) => !isErrorResponse(userRes)
    ) as {
      userRes: DataObject<UserModelSuccessResponse>;
      friendReq: { from: string; createdAt: string };
    }[];

    return notErroredRes.map(({ userRes, friendReq }) => {
      return { user: userRes.data, sentAt: friendReq.createdAt };
    });
  },
};

export default { Query: queryRelatedResolvers };
