import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { requestSendFriendRequest } from "../requests/sendFriendRequest";
import {
  setSendFriendRequestError,
  setSendFriendRequestLoading,
  setSendFriendRequestValue,
} from "../../features/contactsSectionDrawerSlice";

type SendFriendRequestInput = {
  userToAdd: string;
};

export function* handleSendFriendRequest(
  action: PayloadAction<SendFriendRequestInput>
): any {
  const { payload } = action;
  try {
    yield put(setSendFriendRequestError(null));
    yield put(setSendFriendRequestLoading(true));
    const response = yield call(requestSendFriendRequest, payload);
    const { data } = response;
    const {
      requestFriendship: { friendAdded },
    } = data;
    yield put(setSendFriendRequestValue(friendAdded));
    yield put(setSendFriendRequestLoading(false));
  } catch (error: any) {
    yield put(setSendFriendRequestLoading(false));
    if (error.message) {
      yield put(setSendFriendRequestError({ message: error.message }));
    } else {
      yield put(setSendFriendRequestError({ message: "Something went wrong" }));
    }
  }
}
