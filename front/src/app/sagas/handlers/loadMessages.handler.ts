import { PayloadAction } from "@reduxjs/toolkit";
import {
  GetMessagesInput,
  setErrorMessages,
  setLoadingMessages,
  setMessagesNoBatch,
  appendMessages,
} from "../../features/currentChatSlice";
import { put, call } from "redux-saga/effects";
import { loadMessages } from "../requests/loadMessages.request";
import { store } from "../../store";

export function* handleLoadMessages(
  action?: PayloadAction<GetMessagesInput>
): any {
  const payload = action?.payload;
  try {
    yield put(setLoadingMessages(true));
    yield put(
      setMessagesNoBatch(store.getState().currentChat.messagesNoBatch + 1)
    );
    const response = yield call(loadMessages, payload);
    const { data } = response;
    const messages = data.messages;
    yield put(appendMessages(messages));
  } catch (error) {
    put(setLoadingMessages(false));
    put(setErrorMessages(error as Error));
  }
}
