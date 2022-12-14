import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactPreview } from "../../../../types/user.types";

export type DrawerSectionContacts = {
  contactsShown: ContactPreview[];
  searchTerm: string;
};

// Define the initial state using that type
const initialState: DrawerSectionContacts = {
  contactsShown: [],
  searchTerm: "",
};

export const contactsDrawerSection = createSlice({
  name: "mainContactsSubsection",
  initialState,
  reducers: {
    searchContacts(_state, _action: PayloadAction<string>) {},
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

export const { setContactsShown, searchContacts, setSearchTerm, resetState } =
  contactsDrawerSection.actions;

export default contactsDrawerSection.reducer;
