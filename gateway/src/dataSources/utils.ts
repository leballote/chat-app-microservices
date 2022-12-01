import { RESTDataSource } from "@apollo/datasource-rest";
import { GraphQLError } from "graphql";
import { isErrorResponse } from "../types/general.types";

export function HandleError() {
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
          throw new GraphQLError(res.error.message);
        }
        return res;
      } catch (error) {
        if (error?.extensions?.response?.body?.error?.message) {
          throw new GraphQLError(error.extensions.response.body.error.message);
        } else {
          throw new GraphQLError("Something went wrong");
        }
      }
    };
  };
}
