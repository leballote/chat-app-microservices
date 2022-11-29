import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setValue as setChatsPreviews,
  setLoading,
  setError,
} from "../../features/chatsPreviewsSlice";
import { requestGetChatsPreviews } from "../requests/chatsPreviews";

export function* handleChatsPreviews(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    yield put(setLoading(true));
    const response = yield call(requestGetChatsPreviews, payload);
    console.log(response);
    const { data } = response;
    const {
      viewer: { chats },
    } = data;
    yield put(setChatsPreviews(chats));
  } catch (error) {
    yield put(setLoading(false));
    yield put(setError(error));
  }
}
