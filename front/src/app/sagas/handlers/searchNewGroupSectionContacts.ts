import { put, select } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  setContactsShown,
  setSearchTerm,
} from "../../features/appView/newGroupDrawerSection/newGroupSectionDrawerSlice";
import { ContactPreview } from "../../../types/user.types";

export function* handleSearchContactFromNewGroupDrawerSection(
  action: PayloadAction<string>
): any {
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
