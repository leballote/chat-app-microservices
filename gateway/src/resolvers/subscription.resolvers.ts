import { Resolvers, SubscriptionResolvers } from "../generated/graphql";
import { UserModelSuccessResponse } from "../types/servicesRest";
import { withFilter } from "graphql-subscriptions";
import {
  FRIENDSHIP_REQUEST_RECEIVED,
  FRIENDSHIP_RESPONSE_RECEIVED,
  MESSAGE_CREATED,
  pubsub,
} from "./actions";
import { isErrorResponse } from "../types/general.types";
import { GraphQLError } from "graphql";

export const subscriptionResolvers: SubscriptionResolvers = {
  messageCreated: {
    subscribe: async () => {
      return {
        [Symbol.asyncIterator]: withFilter(
          (args) => {
            return pubsub.asyncIterator([MESSAGE_CREATED]);
          },
          function filterMessageCreated() {
            return true;
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
};

const responseSubscriptionResponses: Resolvers = {
  FriendshipResponseReceivedSubscriptionResponse: {
    accepterUser: async (parent, {}, context) => {
      const { user, dataSources } = context as unknown as {
        user: UserModelSuccessResponse;
        dataSources: typeof context.dataSources;
      };
      if (!user) {
        throw new GraphQLError("Not authenticated");
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
        throw new GraphQLError("Not authenticated");
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
        throw new GraphQLError("Not authenticated");
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
        throw new GraphQLError("Not authenticated");
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
        throw new GraphQLError("Not authenticated");
      }
      const parentTemp = parent as any;
      const message = parentTemp.data;
      const chatRes = await dataSources.chatAPI.getChat(message.chatId);
      if (isErrorResponse(chatRes)) {
        throw new GraphQLError(chatRes.error.message);
      }
      const { participants } = chatRes.data;

      // //TODO: delete this line, it is only to debug the subscription
      // return message;
      if (
        participants.map((participant) => participant.id).includes(user._id)
      ) {
        return message;
      } else {
        return null;
      }
    },
  },
};

const subscriptionRelatedResolvers: Resolvers = {
  Subscription: subscriptionResolvers,
  ...responseSubscriptionResponses,
};

export default subscriptionRelatedResolvers;
