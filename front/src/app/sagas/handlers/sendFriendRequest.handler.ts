import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { requestSendFriendRequest } from "../requests/sendFriendRequest";
import {
  setSendFriendRequestError,
  setSendFriendRequestLoading,
  setSendFriendRequestValue,
} from "../../features/appView/contactsDrawerSection/friendRequestsDrawerSlice";
import { handleSagaStatefulError } from "./utils";

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
  } catch (error) {
    console.log(error);
    yield* handleSagaStatefulError(
      error,
      setSendFriendRequestError,
      setSendFriendRequestLoading
    );
  }
}
