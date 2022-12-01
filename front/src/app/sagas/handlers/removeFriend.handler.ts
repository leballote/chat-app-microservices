import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { removeFriend } from "../requests/removeFriend.request";
import { removeContact } from "../../features/contactsPreviewsSlice";
import { store } from "../../store";
import { closeDetails } from "../../features/chatSectionSlice";
import { setValue } from "../../features/currentUserProfilePageSlice";

export function* handleRemoveFriend(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    const response = yield call(removeFriend, { userToRemoveId: payload });
    const { data } = response;
    const { removeFriendship } = data;
    const { userRemoved } = removeFriendship;
    yield put(removeContact(payload));
    if (store.getState().currentUserProfilePage.value?.id == payload) {
      yield put(closeDetails());
      // yield put(setValue(null));
    }
    // yield put(removeFriendRequest(payload));
    // yield put(addContact(acceptFriendship.friendAdded));
  } catch (error) {
    //TODO: see how to handle this error
  }
}
