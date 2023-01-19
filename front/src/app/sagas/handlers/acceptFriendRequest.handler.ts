import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { acceptFriendRequest } from "../requests/acceptFriendRequest";
import { removeFriendRequest } from "../../features/appData/friendRequestsPreviewsSlice";
import { createAndPutGenericErrorNotification } from "../../../utils/createAndDispatchGenericErrorNotification";
import { t } from "i18next";

export function* handleAcceptFriend(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    yield call(acceptFriendRequest, { userToAccept: payload });
    yield put(removeFriendRequest(payload));
  } catch (error) {
    yield* createAndPutGenericErrorNotification({
      error,
      message: t("app.error.default") as string,
    });
  }
}
