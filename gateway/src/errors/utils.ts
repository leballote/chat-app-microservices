import { ErrorObject } from "../types/general.types";
import { GraphQLError } from "graphql";
import { DefaultError } from "../types/servicesRest";

export function createGQLError(res: ErrorObject<DefaultError>) {
  return new GraphQLError(res.error.message, {
    extensions: {
      code: res.error.code,
      meta: res.error.meta,
    },
  });
}

export const authError = new GraphQLError("Not authenticated", {
  extensions: {
    code: "NOT_AUTHENTICATED_ERROR",
  },
});
