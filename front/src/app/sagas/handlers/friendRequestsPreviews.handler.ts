import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setValue,
  setLoading,
  setError,
} from "../../features/friendRequestsPreviewsSlice";
import { requestGetFriendRequestsPreviews } from "../requests/friendRequestsPreviews";
import indexArrayByField from "../../../utils/indexArrayByField";

export function* handleFriendRequestsPreviews(): any {
  try {
    put(setLoading(true));
    const response = yield call(requestGetFriendRequestsPreviews);
    const { data } = response;
    const { friendshipRequestsReceived } = data;
    //TODO: solve this any
    const friendshipRequestsReceivedDict = Object.fromEntries(
      friendshipRequestsReceived.map((el: any) => [el.user.id, el])
    );
    yield put(setValue(friendshipRequestsReceivedDict));
  } catch (error) {
    yield put(setLoading(false));
    yield put(setError(error));
  }
}
