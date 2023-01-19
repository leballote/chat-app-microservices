import { call } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { requestSendMessage } from "../requests/sendMessage";
import { createAndPutGenericErrorNotification } from "../../../utils/createAndDispatchGenericErrorNotification";
import { t } from "i18next";

type MessageInput = {
  content: string;
  chatId: string;
  sentBy: string;
  sentAt: string;
};

export function* handleSendMessage(action: PayloadAction<MessageInput>): any {
  const { payload } = action;
  try {
    yield call(requestSendMessage, payload);
  } catch (error) {
    yield* createAndPutGenericErrorNotification({
      error,
      message: t([
        "app.error.couldntSendMessage",
        "app.error.default",
      ]) as string,
    });
  }
}
