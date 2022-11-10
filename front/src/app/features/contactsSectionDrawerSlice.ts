import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SectionName } from "./types";

export type DrawerSectionContacts = {
  name: SectionName.CONTACTS;
};

// Define the initial state using that type
const initialState: DrawerSectionContacts = {
  name: SectionName.CONTACTS,
};

export const mainDrawerSlice = createSlice({
  name: "mainDrawerSection",
  initialState,
  reducers: {
    resetState() {
      return initialState;
    },
  },
});

export const { resetState } = mainDrawerSlice.actions;

export default mainDrawerSlice.reducer;