import { ApolloError } from "@apollo/client";
import { Dispatch } from "@reduxjs/toolkit";
import { t } from "i18next";
import { put } from "redux-saga/effects";
import { triggerNewNotification } from "../app/features/appView/notifications/notificationsSlice";
import {
  GenericErrorAppNotification,
  NotificationType,
} from "../app/features/appView/types";
import { appNotificationManager } from "../app/features/appView/utils";

type Args = {
  error: any;
  dispatch: Dispatch;
  message?: string;
};

export function createAndDispatchGenericErrorNotification({
  error,
  dispatch,
  message,
}: Args) {
  let message_ = t("errors.fallback");
  if (error instanceof ApolloError) {
    const code = error.graphQLErrors[0].extensions.code;
    message_ = t([`errors.${code}`, "errors.fallback"]);
  }
  const notification: Omit<GenericErrorAppNotification, "id"> = {
    notificationType: NotificationType.GENERIC_ERROR,
    message: message ?? message_,
  };
  dispatch(
    triggerNewNotification(
      appNotificationManager.createNotification({ notification })
    )
  );
}

type Args2 = {
  error: any;
  message?: string;
};

export function* createAndPutGenericErrorNotification({
  error,
  message,
}: Args2) {
  let message_ = t("errors.fallback");
  if (error instanceof ApolloError) {
    const code = error.graphQLErrors[0].extensions.code;
    message_ = t([`errors.${code}`, "errors.fallback"]);
  }
  const notification: Omit<GenericErrorAppNotification, "id"> = {
    notificationType: NotificationType.GENERIC_ERROR,
    message: message ?? message_,
  };
  yield put(
    triggerNewNotification(
      appNotificationManager.createNotification({ notification })
    )
  );
}
