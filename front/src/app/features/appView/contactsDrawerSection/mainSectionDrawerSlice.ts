import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactPreview } from "../../../../types/user.types";
import { createNamespacedActionCreator } from "../../../utils";

export type DrawerSectionContacts = {
  contactsShown: ContactPreview[];
  searchTerm: string;
};

// Define the initial state using that type
const initialState: DrawerSectionContacts = {
  contactsShown: [],
  searchTerm: "",
};

export const mainContactsDrawerSubsectionSlice = createSlice({
  name: "mainContactsSubsection",
  initialState,
  reducers: {
    setContactsShown(state, { payload }: PayloadAction<ContactPreview[]>) {
      state.contactsShown = payload;
    },
    setSearchTerm(state, { payload }: PayloadAction<string>) {
      state.searchTerm = payload;
    },
    resetState() {
      return initialState;
    },
  },
});

const sliceCreateAction = createNamespacedActionCreator(
  mainContactsDrawerSubsectionSlice
);

export const searchContacts = sliceCreateAction<string>("searchContacts");

export const { setContactsShown, setSearchTerm, resetState } =
  mainContactsDrawerSubsectionSlice.actions;

export default mainContactsDrawerSubsectionSlice.reducer;
