import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { requestGetChat } from "../requests/currentChat";
import {
  setError,
  setLoading,
  setValue as setCurrentChatValue,
} from "../../features/appData/currentChatSlice";

export function* handleGetChat(action: PayloadAction<{ chatId: string }>): any {
  const { payload } = action;
  try {
    yield put(setError(null));
    yield put(setLoading(true));
    const response = yield call(requestGetChat, payload);
    const {
      data: {
        viewer: { chat },
      },
    } = response;
    yield put(setCurrentChatValue(chat));
  } catch (error) {
    let message;
    yield put(setLoading(false));
    if ((error as any).message) {
      message = (error as any).message;
    } else {
      message = "something went wrong";
    }
    yield put(setError({ message }));
  }
}
