import { call, put } from "redux-saga/effects";
import { Action } from "@reduxjs/toolkit";
import {
  setValue as setCurrentUser,
  setLoading,
  setError,
} from "../../features/appData/currentUserSlice";
import { requestGetUser } from "../requests/currentUser";

export function* handleGetUser(_action: Action): any {
  try {
    put(setLoading(true));
    const response = yield call(requestGetUser);
    const { data } = response;
    const { viewer } = data;
    yield put(setCurrentUser(viewer));
  } catch (error) {
    let message;
    yield put(setLoading(false));
    if ((error as any).message) {
      message = (error as any).message;
    } else {
      message = "something went wrong";
    }
    yield put(setError({ message }));
  }
}
