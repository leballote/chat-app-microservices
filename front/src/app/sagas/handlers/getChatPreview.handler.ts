import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { upsertChat } from "../../features/appData/chatsPreviewsSlice";
import { requestGetChatPreview } from "../requests/getChatPreview.request";
import { createAndPutGenericErrorNotification } from "../../../utils/createAndDispatchGenericErrorNotification";
import { t } from "i18next";

export function* handleGetChatPreview(action: PayloadAction<string>): any {
  try {
    const response = yield call(requestGetChatPreview, action);
    const { data } = response;
    const {
      viewer: { chat },
    } = data;
    yield put(upsertChat(chat));
  } catch (error) {
    yield* createAndPutGenericErrorNotification({
      error,
      message: t("app.error.default") as string,
    });
  }
}
