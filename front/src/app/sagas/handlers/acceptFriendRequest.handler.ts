import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { acceptFriendRequest } from "../requests/acceptFriendRequest";
import { removeFriendRequest } from "../../features/friendRequestsPreviewsSlice";
import { addContact } from "../../features/contactsPreviewsSlice";

export function* handleAcceptFriend(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    const response = yield call(acceptFriendRequest, { userToAccept: payload });
    const { data } = response;
    const { acceptFriendship } = data;
    yield put(removeFriendRequest(payload));
    console.log("removed");
    console.log("friendAdded", acceptFriendship.friendAdded);
    yield put(addContact(acceptFriendship.friendAdded));
    console.log("added?");
  } catch (error) {
    //TODO: see how to handle this error
  }
}
