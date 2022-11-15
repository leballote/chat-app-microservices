import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SettingsSectionDrawerSubsection as Subsection } from "./types";

export type DrawerSectionSettings = {
  subsection: Subsection;
  settings: {
    language: string;
  };
};

// Define the initial state using that type
const initialState: DrawerSectionSettings = {
  subsection: Subsection.MAIN,
  settings: {
    language: navigator.language,
  },
};

export const newGroupDrawerSlice = createSlice({
  name: "newGroupDrawerSection",
  initialState,
  reducers: {
    //
    setLanguage(state, action: PayloadAction<string>) {
      state.settings.language = action.payload;
    },
    setLanguageSubsection(state) {
      state.subsection = Subsection.LANGUAGE;
    },
    setMainSubsection(state) {
      state.subsection = Subsection.MAIN;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  resetState,
  setLanguage,
  setLanguageSubsection,
  setMainSubsection,
} = newGroupDrawerSlice.actions;

export default newGroupDrawerSlice.reducer;
