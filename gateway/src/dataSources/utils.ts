import { RESTDataSource } from "@apollo/datasource-rest";
import { GraphQLError } from "graphql";
import { isErrorResponse } from "../types/general.types";

export function HandleError(extraHandling?: (...args: any[]) => void) {
  return function (
    _target: RESTDataSource,
    _key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value as (...args: any[]) => Promise<any>;
    descriptor.value = async function (...args: any[]) {
      try {
        const res = await original.bind(this)(...args);
        if (isErrorResponse(res)) {
          if (extraHandling) extraHandling(...args);
          throw new GraphQLError(res.error.message, {
            extensions: { code: "ERROR_NOT_400_NOR_500" },
          });
        }
        return res;
      } catch (error) {
        if (error?.extensions?.response?.body?.error?.message) {
          throw new GraphQLError(error.extensions.response.body.error.message);
        } else if (
          error.message &&
          error?.extensions?.code == "ERROR_NOT_400_NOR_500"
        ) {
          throw error;
        } else {
          if (extraHandling) extraHandling(...args);
          throw new GraphQLError("Something went wrong");
        }
      }
    };
  };
}
