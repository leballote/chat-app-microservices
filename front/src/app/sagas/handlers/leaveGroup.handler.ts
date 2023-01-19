import { call, put, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { leaveGroupRequest } from "../requests/leaveGroup.request";
import { getValue } from "../../features/appData/currentChatSlice";
import { removeChat } from "../../features/appData/chatsPreviewsSlice";
import { createAndPutGenericErrorNotification } from "../../../utils/createAndDispatchGenericErrorNotification";
import { t } from "i18next";

export function* handleLeaveGroup(
  action: PayloadAction<{ chatId: string }>
): any {
  try {
    const {
      payload: { chatId },
    } = action;
    yield call(leaveGroupRequest, action);
    yield put(removeChat({ chatId }));
    const currentChatId = yield select((state) => state.currentChat.value?.id);

    if (currentChatId && currentChatId == chatId) {
      yield put(getValue({ chatId: currentChatId }));
    }
  } catch (error) {
    yield* createAndPutGenericErrorNotification({
      error,
      message: t([
        "app.error.couldntLeaveGroup",
        "app.error.default",
      ]) as string,
    });
  }
}
