import { put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { store } from "../../store";
import {
  setContactsShown,
  setSearchTerm,
} from "../../features/appView/newGroupDrawerSection/newGroupSectionDrawerSlice";

export function* handleSearchContactFromNewGroupDrawerSection(
  action: PayloadAction<string>
): any {
  const { payload } = action;
  yield put(setSearchTerm(payload));
  const contactsFiltered = store
    .getState()
    .contactsPreviews.value.filter((contact) => contact.name.includes(payload));
  yield put(setContactsShown(contactsFiltered));
}
