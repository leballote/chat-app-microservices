import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User } from "../../types/AppTypes";

enum SectionName {
  MAIN,
  CONTACTS,
}

enum Active {
  YES,
  NO,
}

type DrawerSectionChats = {
  name: SectionName.MAIN;
  moreDropdown: Active;
};

type DrawerSectionContacts = {
  name: SectionName.CONTACTS;
};

type DrawerSection = DrawerSectionChats | DrawerSectionContacts;

function isSectionChats(section: DrawerSection): section is DrawerSectionChats {
  return section.name == SectionName.MAIN;
}

function isSectionContacts(
  section: DrawerSection
): section is DrawerSectionContacts {
  return section.name == SectionName.CONTACTS;
}

// Define the initial state using that type
const initialState: DrawerSection = {
  name: SectionName.MAIN,
  moreDropdown: Active.NO,
};

export const mainDrawerSlice = createSlice({
  name: "mainDrawerSection",
  initialState,
  reducers: {
    //
    turnOffMoreDropdown(state) {
      state.moreDropdown = Active.NO;
    },
    turnOnMoreDropdown(state) {
      state.moreDropdown = Active.YES;
    },
  },
});

export const {} = mainDrawerSlice.actions;

export default mainDrawerSlice.reducer;
