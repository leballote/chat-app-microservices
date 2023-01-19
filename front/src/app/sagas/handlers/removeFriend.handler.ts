import { call, put, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { removeFriend } from "../requests/removeFriend.request";
import { removeContact } from "../../features/appData/contactsPreviewsSlice";
import { RootState } from "../../store";
import { closeDetails } from "../../features/appView/chatSectionSlice";
import { t } from "i18next";
import { createAndPutGenericErrorNotification } from "../../../utils/createAndDispatchGenericErrorNotification";

export function* handleRemoveFriend(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    yield call(removeFriend, { userToRemoveId: payload });
    yield put(removeContact(payload));
    const currentUserProfilePageId = yield select(
      (state: RootState) => state.currentUserProfilePage.value?.id
    );
    if (currentUserProfilePageId == payload) {
      yield put(closeDetails());
    }
  } catch (error) {
    yield* createAndPutGenericErrorNotification({
      error,
      message: t([
        "app.error.couldntRemoveFriend",
        "app.error.default",
      ]) as string,
    });
  }
}
