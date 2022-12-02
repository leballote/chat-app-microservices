import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { upsertChat } from "../../features/appData/chatsPreviewsSlice";
import { requestGetChatPreview } from "../requests/getChatPreview.request";

export function* handleGetChatPreview(action: PayloadAction<string>): any {
  try {
    const response = yield call(requestGetChatPreview, action);
    const { data } = response;
    const {
      viewer: { chat },
    } = data;
    yield put(upsertChat(chat));
    // yield put(setChatsPreviews(chat));
  } catch (error) {}
}
