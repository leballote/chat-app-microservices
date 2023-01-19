import { PayloadAction } from "@reduxjs/toolkit";
import {
  GetMessagesInput,
  setErrorMessages,
  setLoadingMessages,
  setMessagesNoBatch,
  appendMessages,
} from "../../features/appData/currentChatSlice";
import { put, call, select } from "redux-saga/effects";
import { loadMessages } from "../requests/loadMessages.request";
import { handleSagaStatefulError } from "./utils";

export function* handleLoadMessages(
  action?: PayloadAction<GetMessagesInput>
): any {
  const payload = action?.payload;
  try {
    yield put(setLoadingMessages(true));
    const messagesNoBatch = yield select(
      (state) => state.currentChat.messagesNoBatch + 1
    );
    yield put(setMessagesNoBatch(messagesNoBatch));
    const response = yield call(loadMessages, payload);
    const { data } = response;
    const messages = data.messages;
    const currentChatId = yield select((state) => state.currentChat.value?.id);
    if (messages.length > 0 && currentChatId == messages[0].chat.id) {
      yield put(appendMessages(messages));
    }
  } catch (error) {
    yield* handleSagaStatefulError(error, setErrorMessages, setLoadingMessages);
  }
}
