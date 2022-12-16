import { call, put } from "redux-saga/effects";
import { Action } from "@reduxjs/toolkit";
import {
  setValue as setCurrentUser,
  setLoading,
  setError,
  setFirstFetch,
} from "../../features/appData/currentUserSlice";
import { requestGetUser } from "../requests/currentUser";

export function* handleGetUser(_action: Action): any {
  try {
    yield put(setError(null));
    yield put(setLoading(true));
    const response = yield call(requestGetUser);
    const { data } = response;
    const { viewer } = data;
    yield put(setCurrentUser(viewer));
    yield put(setFirstFetch(true));
  } catch (error) {
    let message;
    yield put(setLoading(false));
    if ((error as any).message) {
      message = (error as any).message;
    } else {
      message = "something went wrong";
    }
    yield put(setError({ message }));
    yield put(setFirstFetch(true));
  }
}
