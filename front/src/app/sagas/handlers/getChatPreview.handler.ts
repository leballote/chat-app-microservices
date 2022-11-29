import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setValue as setChatsPreviews,
  setLoading,
  setError,
  pushChat,
} from "../../features/chatsPreviewsSlice";
import { requestGetChatPreview } from "../requests/getChatPreview.request";

export function* handleGetChatPreview(action: PayloadAction<string>): any {
  try {
    const response = yield call(requestGetChatPreview, action);
    console.log(response);
    const { data } = response;
    const {
      viewer: { chat },
    } = data;
    yield put(pushChat(chat));
    // yield put(setChatsPreviews(chat));
  } catch (error) {
    console.log("ERROR", error);
  }
}
