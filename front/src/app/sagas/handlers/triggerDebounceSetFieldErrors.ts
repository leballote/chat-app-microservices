import { PayloadAction } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import { setFieldErrors } from "../../features/appView/signup/signupSlice";

export function* handleTriggerDebounceSetSignUpFieldErrors({
  payload,
}: PayloadAction<{ field: string; errors: string[] }>): any {
  yield put(setFieldErrors(payload));
}
