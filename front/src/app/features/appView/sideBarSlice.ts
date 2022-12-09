import { createSlice } from "@reduxjs/toolkit";
import { resetState as resetContactsDrawerSectionState } from "./contactsDrawerSection/mainSectionDrawerSlice";
// import { SideBarSection } from "./types";

//TODO: for some reason I cannot import this; it breaks my application; but just here
export enum SideBarSection {
  MAIN,
  CONTACTS,
  NEW_GROUP,
  SETTINGS,
}
// Define the initial state using that type
const initialState: { name: SideBarSection } = {
  name: SideBarSection.MAIN,
};

export const mainDrawerSlice = createSlice({
  name: "mainDrawerSection",
  initialState,
  reducers: {
    //TODO: maybe set payload as the section we want, but we would have to get the reset functions into an object indexed by enum
    setMainDrawerSection(state) {
      if (state.name != SideBarSection.MAIN) {
        state.name = SideBarSection.MAIN;
      }
    },
    setContactsDrawerSection(state) {
      if (state.name != SideBarSection.CONTACTS) {
        resetContactsDrawerSectionState();
        state.name = SideBarSection.CONTACTS;
      }
    },
    setNewGroupDrawerSection(state) {
      //TODO: reset this state
      if (state.name != SideBarSection.NEW_GROUP) {
        state.name = SideBarSection.NEW_GROUP;
      }
    },
    setSettingsDrawerSection(state) {
      if (state.name != SideBarSection.SETTINGS) {
        state.name = SideBarSection.SETTINGS;
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
