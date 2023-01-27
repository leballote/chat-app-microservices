import { Resolvers, SubscriptionResolvers } from "../generated/graphql";
import { UserModelSuccessResponse } from "../types/servicesRest";
import { withFilter } from "graphql-subscriptions";
import {
  CHAT_DELETED,
  FRIENDSHIP_REQUEST_RECEIVED,
  FRIENDSHIP_RESPONSE_RECEIVED,
  MESSAGE_CREATED,
  FRIENDSHIP_REMOVED,
  pubsub,
} from "./actions";
import { isErrorResponse } from "../types/general.types";
import { authError, createGQLError } from "../errors/utils";

export const subscriptionResolvers: SubscriptionResolvers = {
  messageCreated: {
    subscribe: async () => {
      return {
        [Symbol.asyncIterator]: withFilter(
          () => {
            return pubsub.asyncIterator([MESSAGE_CREATED]);
          },
          function filterMessageCreated() {
            return true;
          }
        ),
      };
    },
  },
  chatRemoved: {
    subscribe: async (_parent, input, { dataSources }) => {
      const viewer = await dataSources.getViewer();
      return {
        [Symbol.asyncIterator]: withFilter(
          () => {
            return pubsub.asyncIterator([CHAT_DELETED]);
          },
          (payload) => {
            return payload.chatRemoved.participants
              ?.map((participant) => participant.id)
              .includes(viewer?._id);
          }
        ),
      };
    },
  },
  friendshipResponseReceived: {
    subscribe: async () => {
      return {
        [Symbol.asyncIterator]: withFilter(
          () => {
            return pubsub.asyncIterator([FRIENDSHIP_RESPONSE_RECEIVED]);
          },
          function filterMessageCreated() {
            return true;
          }
        ),
      };
    },
  },
  friendshipRequestReceived: {
    subscribe: async () => {
      return {
        [Symbol.asyncIterator]: withFilter(
          () => {
            return pubsub.asyncIterator([FRIENDSHIP_REQUEST_RECEIVED]);
          },
          function filterMessageCreated() {
            return true;
          }
        ),
      };
    },
  },
  friendshipRemoved: {
    subscribe: async (_parent, _input, { dataSources }) => {
      // const viewer = await dataSources.getViewer();
      return {
        [Symbol.asyncIterator]: withFilter(
          () => {
            return pubsub.asyncIterator([FRIENDSHIP_REMOVED]);
          },
          function filterFn(payload) {
            return true;
            // return [payload.remover._id, payload.removed._id].includes(
            // viewer._id
            // );
          }
        ),
      };
    },
  },
};

const responseSubscriptionResponses: Resolvers = {
  FriendshipResponseReceivedSubscriptionResponse: {
    accepterUser: async (parent, {}, context) => {
      const { user } = context as unknown as {
        user: UserModelSuccessResponse;
        dataSources: typeof context.dataSources;
      };
      if (!user) {
        throw authError;
      }

      const parent_ = parent as unknown as {
        sender: UserModelSuccessResponse;
        receiver: UserModelSuccessResponse;
      };

      if (user._id == parent_.receiver._id || user._id == parent_.sender._id) {
        return parent_.sender;
      } else {
        return null;
      }
    },
    requesterUser: async (parent, {}, context) => {
      const { user, dataSources } = context as unknown as {
        user: UserModelSuccessResponse;
        dataSources: typeof context.dataSources;
      };
      if (!user) {
        throw authError;
      }

      const parent_ = parent as unknown as {
        sender: UserModelSuccessResponse;
        receiver: UserModelSuccessResponse;
      };

      if (user._id == parent_.receiver._id || user._id == parent_.sender._id) {
        return parent_.receiver;
      } else {
        return null;
      }
    },
  },
  FriendshipRequestReceivedSubscriptionResponse: {
    requesterUser: async (parent, {}, context) => {
      const { user, dataSources } = context as unknown as {
        user: UserModelSuccessResponse;
        dataSources: typeof context.dataSources;
      };
      if (!user) {
        throw authError;
      }

      const parent_ = parent as unknown as {
        sender: UserModelSuccessResponse;
        receiver: UserModelSuccessResponse;
      };
      if (user._id == parent_.receiver._id) {
        return parent_.sender;
      } else {
        return null;
      }
    },
    accepterUser: async (parent, {}, context) => {
      const { user, dataSources } = context as unknown as {
        user: UserModelSuccessResponse;
        dataSources: typeof context.dataSources;
      };
      if (!user) {
        throw authError;
      }

      const parent_ = parent as unknown as {
        sender: UserModelSuccessResponse;
        receiver: UserModelSuccessResponse;
      };
      if (user._id == parent_.receiver._id) {
        return parent_.receiver;
      } else {
        return null;
      }
    },
  },
  MessageCreatedSubscriptionResponse: {
    message: async (parent, {}, context) => {
      //TODO: change this type to the correct one
      const { user, dataSources } = context as any;
      if (!user) {
        throw authError;
      }
      const parentTemp = parent as any;
      const message = parentTemp.data;
      const chatRes = await dataSources.chatAPI.getChat(message.chatId);
      if (isErrorResponse(chatRes)) {
        throw createGQLError(chatRes);
      }
      const { participants } = chatRes.data;

      if (
        participants.map((participant) => participant.id).includes(user._id)
      ) {
        return message;
      } else {
        return null;
      }
    },
  },
  ChatRemovedSubscriptionResponse: {
    chatRemoved: (parent) => {
      console.log("chat removed resolver");
      const parentTemp = parent as any;
      return parentTemp;
    },
  },
  // FriendshipRemovedResponse: {},
};

const subscriptionRelatedResolvers: Resolvers = {
  Subscription: subscriptionResolvers,
  ...responseSubscriptionResponses,
};

export default subscriptionRelatedResolvers;
