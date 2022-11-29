import { Resolvers } from "../generated/graphql";
import generalResolvers from "./general.resolvers";
import mutationRelatedResolvers from "./mutation.resolvers";
import queryRelatedResolvers from "./query.resolvers";
import subscriptionRelatedResolvers from "./subscription.resolvers";

const resolvers: Resolvers = {
  ...generalResolvers,
  ...mutationRelatedResolvers,
  ...queryRelatedResolvers,
  ...subscriptionRelatedResolvers,
};

export default resolvers;
