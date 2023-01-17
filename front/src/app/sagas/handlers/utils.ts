import { ApolloError } from "@apollo/client";
import { put } from "redux-saga/effects";

type SetErrorFunction = (error: any) => any;
type SetLoadingFunction = (loading: boolean) => any;

export function* handleSagaStatefulError(
  error: any,
  setError: SetErrorFunction,
  setLoading: SetLoadingFunction
) {
  yield put(setLoading(false));
  if (error instanceof ApolloError) {
    const message = error.graphQLErrors[0].message;
    const { code, meta } = error.graphQLErrors[0].extensions as {
      code: string;
      meta?: object;
    };
    yield put(setError({ message, code, meta }));
  } else {
    yield put(
      setError({
        message: "Something went wrong",
        code: "UNEXPECTED_ERROR",
      })
    );
  }
}
