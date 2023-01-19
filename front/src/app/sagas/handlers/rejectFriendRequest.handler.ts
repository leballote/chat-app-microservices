import { call } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { rejectFriendRequest } from "../requests/rejectFriendRequest";
import { t } from "i18next";
import { createAndPutGenericErrorNotification } from "../../../utils/createAndDispatchGenericErrorNotification";

export function* handleRejectFriendRequest(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    yield call(rejectFriendRequest, { userToReject: payload });
  } catch (error) {
    yield* createAndPutGenericErrorNotification({
      error,
      message: t([
        "app.error.couldntRejectFriendship",
        "app.error.default",
      ]) as string,
    });
  }
}
