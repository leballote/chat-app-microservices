import { call, put } from "redux-saga/effects";
import { Action } from "@reduxjs/toolkit";
import {
  setValue as setCurrentUser,
  setLoading,
  setError,
} from "../../features/currentUserSlice";
import { requestGetUser } from "../requests/currentUser";

export function* handleGetUser(_action: Action): any {
  try {
    put(setLoading(true));
    const response = yield call(requestGetUser);
    const { data } = response;
    const { viewer } = data;
    yield put(setCurrentUser(viewer));
  } catch (error) {
    yield put(setLoading(false));
    yield put(setError(error));
  }
}
