import { PayloadAction } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import {
  PartialErrors,
  setErrors,
} from "../../features/appView/signup/signupSlice";

export function* handleTriggerDebounceSetSignUpErrors({
  payload,
}: PayloadAction<PartialErrors>): any {
  yield put(setErrors(payload));
}
