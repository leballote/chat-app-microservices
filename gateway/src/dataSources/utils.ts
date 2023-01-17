import { RESTDataSource } from "@apollo/datasource-rest";
import { GraphQLError } from "graphql";
import { isErrorResponse } from "../types/general.types";

export function HandleError(
  extraHandlingInDecorator?: (...args: any[]) => void
) {
  return function (
    _target: RESTDataSource,
    _key: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value as (...args: any[]) => Promise<any>;
    descriptor.value = async function (...args: any[]) {
      let errorToSend: any;
      try {
        const res = await original.bind(this)(...args);

        if (isErrorResponse(res)) {
          if (extraHandlingInDecorator) extraHandlingInDecorator(...args);
          throw new GraphQLError(res.error.message, {
            extensions: { code: "ERROR_NOT_400_NOR_500" },
          });
        }
        return res;
      } catch (error) {
        if (error?.extensions?.response?.body?.error?.message) {
          errorToSend = {
            message: error.extensions.response.body.error.message,
            code: error.extensions.response.body?.error?.code,
            meta: error.extensions.response.body?.error?.meta,
          };
        } else if (
          error.message &&
          error?.extensions?.code == "ERROR_NOT_400_NOR_500"
        ) {
          errorToSend = {
            message: error.message,
            extensions: {
              code: "ERROR_NOT_400_NOR_500",
            },
          };
        } else {
          if (extraHandlingInDecorator) extraHandlingInDecorator(...args);
          errorToSend = { message: "Something went wrong" };
        }
      } finally {
        if (errorToSend) {
          // console.log(errorToSend);
          return { error: { ...errorToSend } };
        }
      }
    };
  };
}
