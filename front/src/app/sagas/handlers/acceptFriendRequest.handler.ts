import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { acceptFriendRequest } from "../requests/acceptFriendRequest";
import { removeFriendRequest } from "../../features/appData/friendRequestsPreviewsSlice";

export function* handleAcceptFriend(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    const response = yield call(acceptFriendRequest, { userToAccept: payload });
    const { data } = response;
    const { acceptFriendship } = data;
    yield put(removeFriendRequest(payload));
    // yield put(addContact(acceptFriendship.friendAdded));
  } catch (error) {
    //TODO: see how to handle this error
  }
}
