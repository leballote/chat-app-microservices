import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resetState as resetContactsDrawerSectionState } from "./contactsSectionDrawerSlice";
import { SectionName } from "./types";

// Define the initial state using that type
const initialState: { name: SectionName } = {
  name: SectionName.MAIN,
};

export const mainDrawerSlice = createSlice({
  name: "mainDrawerSection",
  initialState,
  reducers: {
    //TODO: maybe set payload as the section we want, but we would have to get the reset functions into an object indexed by enum
    setMainDrawerSection(state) {
      if (state.name != SectionName.MAIN) {
        state.name = SectionName.MAIN;
      }
    },
    setContactsDrawerSection(state) {
      if (state.name != SectionName.CONTACTS) {
        resetContactsDrawerSectionState();
        state.name = SectionName.CONTACTS;
      }
    },
    setNewGroupDrawerSection(state) {
      //TODO: reset this state
      if (state.name != SectionName.NEW_GROUP) {
        state.name = SectionName.NEW_GROUP;
      }
    },
    setSettingsDrawerSection(state) {
      if (state.name != SectionName.SETTINGS) {
        state.name = SectionName.SETTINGS;
      }
    },
  },
});

export const {
  setMainDrawerSection,
  setContactsDrawerSection,
  setNewGroupDrawerSection,
  setSettingsDrawerSection,
} = mainDrawerSlice.actions;

export default mainDrawerSlice.reducer;
