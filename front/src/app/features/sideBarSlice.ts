import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { resetState as resetMainDrawerSectionState } from "./mainSectionDrawerSlice";
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
    setMainDrawerSection(state) {
      if (state.name != SectionName.MAIN) {
        resetMainDrawerSectionState();
        state.name = SectionName.MAIN;
      }
    },
    setContactsDrawerSection(state) {
      if (state.name != SectionName.CONTACTS) {
        resetContactsDrawerSectionState();
        state.name = SectionName.CONTACTS;
      }
    },
  },
});

export const { setMainDrawerSection, setContactsDrawerSection } =
  mainDrawerSlice.actions;

export default mainDrawerSlice.reducer;
