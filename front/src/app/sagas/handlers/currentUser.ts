import { call, put } from "redux-saga/effects";
import { Action } from "@reduxjs/toolkit";
import {
  setValue as setCurrentUser,
  setLoading,
  setError,
} from "../../features/currentUserSlice";
import { requestGetUser } from "../requests/currentUser";

export function* handleGetUser(action: Action): any {
  try {
    put(setLoading());
    const response = yield call(requestGetUser);
    const { data } = response;
    const { viewer } = data;
    console.log(response);
    yield put(setCurrentUser(viewer));
  } catch (error) {
    put(setError(error));
  }
}
