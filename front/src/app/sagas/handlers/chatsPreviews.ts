import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setValue as setChatsPreviews,
  setLoading,
  setError,
} from "../../features/appData/chatsPreviewsSlice";
import { requestGetChatsPreviews } from "../requests/chatsPreviews";
import indexArrayByField from "../../../utils/indexArrayByField";

export function* handleChatsPreviews(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    yield put(setError(null));
    yield put(setLoading(true));
    const response = yield call(requestGetChatsPreviews, payload);
    const { data } = response;
    const {
      viewer: { chats },
    } = data;
    const chats_ = indexArrayByField(chats, "id");
    yield put(setChatsPreviews(chats_));
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
