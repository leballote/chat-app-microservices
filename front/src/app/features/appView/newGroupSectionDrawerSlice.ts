import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import removeOne from "../../../utils/removeOne";
import { GroupSectionDrawerSubsection } from "./types";

export type DrawerSectionNewGroup = {
  subsection: GroupSectionDrawerSubsection;
  participantsToAdd: string[];
};

// Define the initial state using that type
const initialState: DrawerSectionNewGroup = {
  subsection: GroupSectionDrawerSubsection.ADD_FRIENDS,
  participantsToAdd: [],
};

export const newGroupDrawerSlice = createSlice({
  name: "newGroupDrawerSection",
  initialState,
  reducers: {
    //
    addParticipant(state, action: PayloadAction<string>) {
      if (!state.participantsToAdd.includes(action.payload)) {
        state.participantsToAdd.push(action.payload);
      }
    },
    setAddFriendsSubsection(state) {
      state.subsection = GroupSectionDrawerSubsection.ADD_FRIENDS;
    },
    setSetTitleAndAvatarSubsection(state) {
      state.subsection = GroupSectionDrawerSubsection.SET_TITLE_AND_AVATAR;
    },
    removeParticipant(state, action: PayloadAction<string>) {
      state.participantsToAdd = removeOne(
        state.participantsToAdd,
        action.payload
      );
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  addParticipant,
  removeParticipant,
  resetState,
  setAddFriendsSubsection,
  setSetTitleAndAvatarSubsection,
} = newGroupDrawerSlice.actions;

export default newGroupDrawerSlice.reducer;
