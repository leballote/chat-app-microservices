import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { store } from "../../../store";

export type DrawerSectionContacts = {
  contactsShown: string[];
};

// Define the initial state using that type
const initialState: DrawerSectionContacts = {
  contactsShown: [],
};

export const contactsDrawerSection = createSlice({
  name: "mainContactsSubsection",
  initialState,
  reducers: {
    resetState() {
      return initialState;
    },
  },
});

export const { resetState } = contactsDrawerSection.actions;

export default contactsDrawerSection.reducer;
