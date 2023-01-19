import { call, put } from "redux-saga/effects";
import { logoutRequest } from "../requests/logout.request";
import {
  setLogoutActionError,
  setLogoutActionValue,
  setLououtActionLoading,
} from "../../features/appData/authSlice";
import client from "../../../client";
import { setFirstFetch } from "../../features/appData/currentUserSlice";
import { handleSagaStatefulError } from "./utils";

export function* handleLogout(): any {
  try {
    yield put(setLououtActionLoading(true));
    yield put(setLogoutActionError(null));
    const response = yield call(logoutRequest);
    const { data } = response;
    const { logout } = data;
    yield put({ type: "root/resetState" });
    yield put(setLogoutActionValue(logout));
    yield call(client.resetStore);
    //TODO: I don't remember what is this for
    yield put(setFirstFetch(true));
  } catch (error) {
    yield* handleSagaStatefulError(
      error,
      setLogoutActionError,
      setLououtActionLoading
    );
    //TODO: I don't remember what is this for
    yield put(setFirstFetch(true));
  }
}
