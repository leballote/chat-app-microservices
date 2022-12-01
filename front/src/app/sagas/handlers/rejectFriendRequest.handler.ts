import { call } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { rejectFriendRequest } from "../requests/rejectFriendRequest";

export function* handleRejectFriendRequest(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    yield call(rejectFriendRequest, { userToReject: payload });
    // yield put(removeFriendRequest(payload));
    // yield put(addContact(acceptFriendship.friendAdded));
  } catch (error) {
    //TODO: see how to handle this error
  }
}
