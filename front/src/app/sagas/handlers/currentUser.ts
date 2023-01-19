import { call, put } from "redux-saga/effects";
import {
  setValue as setCurrentUser,
  setLoading,
  setError,
  setFirstFetch,
} from "../../features/appData/currentUserSlice";
import { requestGetUser } from "../requests/currentUser";
import { handleSagaStatefulError } from "./utils";

export function* handleGetUser(): any {
  try {
    yield put(setError(null));
    yield put(setLoading(true));
    const response = yield call(requestGetUser);
    const { data } = response;
    const { viewer } = data;
    yield put(setCurrentUser(viewer));
    yield put(setFirstFetch(true));
  } catch (error) {
    yield* handleSagaStatefulError(error, setError, setLoading);
    yield put(setFirstFetch(true));
  }
}
