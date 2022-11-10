import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { requestGetChat } from "../requests/currentChat";
import {
  currentChatSlice,
  setError,
  setLoading,
  setValue as setCurrentChatValue,
} from "../../features/currentChatSlice";

//TODO: how to remove this nay
export function* handleGetChat(action: PayloadAction<{ chatId: string }>): any {
  const { payload } = action;
  try {
    put(setLoading());
    //TODO: look how to turn off this error
    const requestGetChat2 = requestGetChat as any;
    //TODO: solve this any
    const response = yield call(requestGetChat2, payload);
    const {
      data: {
        viewer: { chat },
      },
    } = response;
    yield put(setCurrentChatValue(chat));
  } catch (error) {
    put(setError(error));
  }
}
