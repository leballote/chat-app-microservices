import { PayloadAction } from "@reduxjs/toolkit";
import { delay, put } from "redux-saga/effects";
import {
  pushNotification,
  removeNotification,
} from "../../features/appView/notifications/notificationsSlice";
import { AppNotification } from "../../features/appView/types";

export function* handleNewNotification({
  payload: notification,
}: PayloadAction<AppNotification>) {
  yield put(pushNotification(notification));
  yield delay(4000);
  yield put(removeNotification({ notificationId: notification.id }));
}
