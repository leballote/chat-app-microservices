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
    yield put(setSendFriendRequestLoading(true));
    console.log("before response");
    const response = yield call(requestSendFriendRequest, payload);
    console.log("after response");
    const { data } = response;
    console.log("DATA", data);
    const {
      requestFriendship: { friendAdded },
    } = data;
    yield put(setSendFriendRequestValue(friendAdded));
    yield put(setSendFriendRequestLoading(false));
  } catch (error) {
    console.log("error", error);
    yield put(setSendFriendRequestLoading(false));
    yield put(setSendFriendRequestError(error as Error));
  }
}
