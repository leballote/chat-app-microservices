import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setValue as setContactsPreviewsValue,
  setLoading,
  setError,
} from "../../features/contactsPreviewsSlice";
import { requestGetContactsPreviews } from "../requests/contactsPreviews";

export function* handleContactsPreviews(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    put(setLoading());
    const response = yield call(requestGetContactsPreviews, payload);
    const { data } = response;
    const {
      viewer: { friends: contacts },
    } = data;
    yield put(setContactsPreviewsValue(contacts));
  } catch (error) {
    put(setError(error));
  }
}