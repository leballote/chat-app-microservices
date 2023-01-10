import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactPreview } from "../../../../types/user.types";
import removeOne from "../../../../utils/removeOne";
import { createNamespacedActionCreator } from "../../../utils";
import { GroupSectionDrawerSubsection } from "../types";

export type DrawerSectionNewGroup = {
  subsection: GroupSectionDrawerSubsection;
  contactsShown: ContactPreview[];
  searchTerm: string;
  participantsToAdd: string[];
};

// Define the initial state using that type
const initialState: DrawerSectionNewGroup = {
  subsection: GroupSectionDrawerSubsection.ADD_FRIENDS,
  contactsShown: [],
  searchTerm: "",
  participantsToAdd: [],
};

export const newGroupDrawerSlice = createSlice({
  name: "newGroupDrawerSection",
  initialState,
  reducers: {
    //
    setContactsShown(state, { payload }: PayloadAction<ContactPreview[]>) {
      state.contactsShown = payload;
    },
    setSearchTerm(state, { payload }: PayloadAction<string>) {
      state.searchTerm = payload;
    },
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

const sliceCreateAction = createNamespacedActionCreator(newGroupDrawerSlice);

export const searchContacts = sliceCreateAction<string>("searchContacts");

export const {
  addParticipant,
  removeParticipant,
  setAddFriendsSubsection,
  setSetTitleAndAvatarSubsection,
  setContactsShown,
  setSearchTerm,
  resetState,
} = newGroupDrawerSlice.actions;

export default newGroupDrawerSlice.reducer;
