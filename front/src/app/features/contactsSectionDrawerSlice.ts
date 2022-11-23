import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DrawerSectionContacts = {
  addFriendOpen: boolean;
  sendFriendRequest: {
    value: AddedFriend | null;
    loading: boolean;
    error: Error | null;
  };
};

type AddedFriend = {
  id: string;
  email: string;
  username: string;
};

// Define the initial state using that type
const initialState: DrawerSectionContacts = {
  addFriendOpen: false,
  sendFriendRequest: {
    value: null,
    loading: false,
    error: null,
  },
};

export const contactsDrawerSectionSlice = createSlice({
  name: "mainDrawerSection",
  initialState,
  reducers: {
    //TODO: this type could be more specific
    sendFriendRequest(
      _,
      action: PayloadAction<{
        userToAdd?: string;
        userToAddEmail?: string;
        userToAddUsername?: string;
      }>
    ) {},
    setSendFriendRequestValue(
      state,
      { payload }: PayloadAction<AddedFriend | null>
    ) {
      state.sendFriendRequest.value = payload;
    },
    setSendFriendRequestLoading(state, { payload }: PayloadAction<boolean>) {
      state.sendFriendRequest.loading = payload;
    },
    setSendFriendRequestError(state, { payload }: PayloadAction<Error | null>) {
      state.sendFriendRequest.error = payload;
    },
    openAddFriendModal(state) {
      state.addFriendOpen = true;
    },
    closeAddFriendModal(state) {
      state.addFriendOpen = false;
    },
    resetSendFriendRequest(state) {
      state.sendFriendRequest = initialState.sendFriendRequest;
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
  setSendFriendRequestValue,
  setSendFriendRequestLoading,
  setSendFriendRequestError,
  sendFriendRequest,
  resetSendFriendRequest,
} = contactsDrawerSectionSlice.actions;

export default contactsDrawerSectionSlice.reducer;
