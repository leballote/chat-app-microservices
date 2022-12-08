import { PayloadAction } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import {
  setChatsShown,
  setSearchTerm,
} from "../../features/appView/chatsDrawerSection/chatDrawerSection";
import { store } from "../../store";

export function* handleSearchChats(action: PayloadAction<string>): any {
  const { payload } = action;
  yield put(setSearchTerm(payload));

  const chatsFiltered = Object.entries(store.getState().chatsPreviews.value)
    .filter(([, val]) => {
      return val.name.includes(payload);
    })
    .map(([, val]) => val);
  yield put(setChatsShown(chatsFiltered));
}
