import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SectionName } from "./types";

export type DrawerSectionContacts = {
  addFriendOpen: boolean;
};

// Define the initial state using that type
const initialState: DrawerSectionContacts = {
  addFriendOpen: false,
};

export const contactsDrawerSectionSlice = createSlice({
  name: "mainDrawerSection",
  initialState,
  reducers: {
    openAddFriendModal(state) {
      state.addFriendOpen = true;
    },
    closeAddFriendModal(state) {
      state.addFriendOpen = false;
    },
    resetState() {
      return initialState;
    },
  },
});

export const { resetState, openAddFriendModal, closeAddFriendModal } =
  contactsDrawerSectionSlice.actions;

export default contactsDrawerSectionSlice.reducer;
