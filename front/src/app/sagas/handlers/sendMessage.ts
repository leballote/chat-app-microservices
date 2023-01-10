import { call } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { requestSendMessage } from "../requests/sendMessage";

//TODO: this should be in types folder
type MessageInput = {
  content: string;
  chatId: string;
  sentBy: string;
  sentAt: string;
};

export function* handleSendMessage(action: PayloadAction<MessageInput>): any {
  const { payload } = action;
  try {
    const response = yield call(requestSendMessage, payload);
    const { data } = response;
    const {
      createMessage: { message, success },
    } = data;
    // yield put(pushMessage(message));
  } catch (error) {
    // TODO: see how to handle this error
  }
}
