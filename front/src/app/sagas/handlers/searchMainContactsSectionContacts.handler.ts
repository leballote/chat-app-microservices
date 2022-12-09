import { PayloadAction } from "@reduxjs/toolkit";
import { put } from "redux-saga/effects";
import {
  setContactsShown,
  setSearchTerm,
} from "../../features/appView/contactsDrawerSection/mainSectionDrawerSlice";
import { store } from "../../store";

export function* handleSearchContact(action: PayloadAction<string>): any {
  const { payload } = action;
  yield put(setSearchTerm(payload));
  const contactsFiltered = store
    .getState()
    .contactsPreviews.value.filter((contact) => contact.name.includes(payload));
  yield put(setContactsShown(contactsFiltered));
}
