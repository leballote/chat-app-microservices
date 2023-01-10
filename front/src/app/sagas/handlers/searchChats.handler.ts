import { PayloadAction } from "@reduxjs/toolkit";
import { put, select } from "redux-saga/effects";
import { ChatPreview } from "../../../types/chat.types";
import {
  setChatsShown,
  setSearchTerm,
} from "../../features/appView/chatsDrawerSection/chatDrawerSection";

export function* handleSearchChats(action: PayloadAction<string>): any {
  const { payload } = action;
  yield put(setSearchTerm(payload));
  const chatsPreviews: ChatPreview[] = yield select(
    (state) => state.chatsPreviews.value
  );

  const chatsFiltered = Object.entries(chatsPreviews)
    .filter(([, val]) => {
      return val.name.includes(payload);
    })
    .map(([, val]) => val);
  yield put(setChatsShown(chatsFiltered));
}
