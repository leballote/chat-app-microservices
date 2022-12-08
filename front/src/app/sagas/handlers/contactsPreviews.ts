import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setValue as setContactsPreviewsValue,
  setLoading,
  setError,
} from "../../features/appData/contactsPreviewsSlice";
import { requestGetContactsPreviews } from "../requests/contactsPreviews";
import { GraphQLError } from "graphql";

export function* handleContactsPreviews(action: PayloadAction<string>): any {
  const { payload } = action;
  try {
    yield put(setLoading(true));
    const response = yield call(requestGetContactsPreviews, payload);
    const { data } = response;
    const {
      viewer: { friends: contacts },
    } = data;
    yield put(setContactsPreviewsValue(contacts));
  } catch (error) {
    yield put(setLoading(false));
    yield put(setError((error as unknown as GraphQLError).message));
  }
}
