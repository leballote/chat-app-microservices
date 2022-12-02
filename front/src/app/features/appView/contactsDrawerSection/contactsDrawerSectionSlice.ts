import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactsSectionDrawerSubsection } from "../types";

export type DrawerSectionContacts = {
  addFriendOpen: boolean;
  section: ContactsSectionDrawerSubsection;
};

const initialState: DrawerSectionContacts = {
  addFriendOpen: false,
  section: ContactsSectionDrawerSubsection.MAIN,
};

export const contactsDrawerSection = createSlice({
  name: "contactsDrawerSubsection",
  initialState,
  reducers: {
    openAddFriendModal(state) {
      state.addFriendOpen = true;
    },
    closeAddFriendModal(state) {
      state.addFriendOpen = false;
    },
    setMainSubsection(state) {
      state.section = ContactsSectionDrawerSubsection.MAIN;
    },
    setFriendRequestsSubsection(state) {
      state.section = ContactsSectionDrawerSubsection.FRIEND_REQUESTS;
    },
    setSubsection(
      state,
      { payload }: PayloadAction<ContactsSectionDrawerSubsection>
    ) {
      state.section = payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  resetState,
  openAddFriendModal,
  closeAddFriendModal,
  setSubsection,
  setMainSubsection,
  setFriendRequestsSubsection,
} = contactsDrawerSection.actions;

export default contactsDrawerSection.reducer;
