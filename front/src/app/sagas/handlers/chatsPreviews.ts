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
    put(setLoading(true));
    const response = yield call(requestGetChatsPreviews, payload);
    const { data } = response;
    const {
      viewer: { chats },
    } = data;
    yield put(setChatsPreviews(chats));
  } catch (error) {
    put(setLoading(false));
    put(setError(error));
  }
}
