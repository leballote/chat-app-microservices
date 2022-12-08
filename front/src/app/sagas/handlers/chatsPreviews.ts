import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setValue as setChatsPreviews,
  setLoading,
  setError,
  setSearchTerm,
} from "../../features/appData/chatsPreviewsSlice";
import { requestGetChatsPreviews } from "../requests/chatsPreviews";
import indexArrayByField from "../../../utils/indexArrayByField";
import { GraphQLError } from "graphql";

export function* handleChatsPreviews(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    yield put(setError(null));
    console.log("after error");
    yield put(setLoading(true));
    console.log("after loading");
    const response = yield call(requestGetChatsPreviews, payload);
    console.log("response", response);
    const { data } = response;
    const {
      viewer: { chats },
    } = data;
    const chats_ = indexArrayByField(chats, "id");
    yield put(setChatsPreviews(chats_));
  } catch (error) {
    yield put(setLoading(false));
    // console.log(error.message);
    yield put(setError((error as unknown as GraphQLError).message));
  }
}
