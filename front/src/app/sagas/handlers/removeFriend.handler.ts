import { call, put, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { removeFriend } from "../requests/removeFriend.request";
import { removeContact } from "../../features/appData/contactsPreviewsSlice";
import { RootState } from "../../store";
import { closeDetails } from "../../features/appView/chatSectionSlice";

export function* handleRemoveFriend(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    const response = yield call(removeFriend, { userToRemoveId: payload });
    const { data } = response;
    const { removeFriendship } = data;
    const { userRemoved } = removeFriendship;
    yield put(removeContact(payload));
    const currentUserProfilePageId = yield select(
      (state: RootState) => state.currentUserProfilePage.value?.id
    );
    if (currentUserProfilePageId == payload) {
      yield put(closeDetails());
    }
  } catch (error) {
    //TODO: see how to handle this error
  }
}
