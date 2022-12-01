import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setValue as setChatsPreviews,
  setLoading,
  setError,
} from "../../features/chatsPreviewsSlice";
import { requestGetChatsPreviews } from "../requests/chatsPreviews";
import indexArrayByField from "../../../utils/indexArrayByField";

export function* handleChatsPreviews(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    yield put(setLoading(true));
    const response = yield call(requestGetChatsPreviews, payload);
    const { data } = response;
    const {
      viewer: { chats },
    } = data;
    const chats_ = indexArrayByField(chats, "id");
    yield put(setChatsPreviews(chats_));
  } catch (error) {
    yield put(setLoading(false));
    yield put(setError(error));
  }
}
