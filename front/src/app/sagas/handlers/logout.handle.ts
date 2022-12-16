import { call, put } from "redux-saga/effects";
import { logoutRequest } from "../requests/logout.request";
import {
  setLogoutActionError,
  setLogoutActionValue,
  setLououtActionLoading,
} from "../../features/appData/authSlice";
import client, { wsLink } from "../../../client";
import { setFirstFetch } from "../../features/appData/currentUserSlice";

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
    yield put(setFirstFetch(true));
  } catch (error) {
    console.log(error);
    let message;
    yield put(setLououtActionLoading(false));
    if ((error as any).message) {
      message = (error as any).message;
    } else {
      message = "something went wrong";
    }
    yield put(setFirstFetch(true));
    yield put(setLogoutActionError({ message }));
  }
}
