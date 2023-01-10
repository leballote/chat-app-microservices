import { PayloadAction } from "@reduxjs/toolkit";
import { put, select } from "redux-saga/effects";
import { ContactPreview } from "../../../types/user.types";
import {
  setContactsShown,
  setSearchTerm,
} from "../../features/appView/contactsDrawerSection/mainSectionDrawerSlice";

export function* handleSearchContact(action: PayloadAction<string>): any {
  const { payload } = action;
  yield put(setSearchTerm(payload));
  const contacts: ContactPreview[] = yield select(
    (state) => state.contactsPreviews.value
  );

  const contactsFiltered = contacts.filter((contact) =>
    contact.name.includes(payload)
  );
  yield put(setContactsShown(contactsFiltered));
}
