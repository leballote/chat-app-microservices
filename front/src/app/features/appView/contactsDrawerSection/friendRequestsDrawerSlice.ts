import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createNamespacedActionCreator } from "../../../utils";

export type FriendsRequestsSubsectionState = {
  sendFriendRequest: {
    value: AddedFriend | null;
    loading: boolean;
    error: { message: string } | null;
  };
};

type AddedFriend = {
  id: string;
  email: string;
  username: string;
};

// Define the initial state using that type
const initialState: FriendsRequestsSubsectionState = {
  sendFriendRequest: {
    value: null,
    loading: false,
    error: null,
  },
};

export const contactsDrawerSectionSlice = createSlice({
  name: "friendsRequestsSubsection",
  initialState,
  reducers: {
    //TODO: this type could be more specific
    setSendFriendRequestValue(
      state,
      { payload }: PayloadAction<AddedFriend | null>
    ) {
      state.sendFriendRequest.value = payload;
    },
    setSendFriendRequestLoading(state, { payload }: PayloadAction<boolean>) {
      state.sendFriendRequest.loading = payload;
    },
    setSendFriendRequestError(
      state,
      { payload }: PayloadAction<{ message: string } | null>
    ) {
      state.sendFriendRequest.error = payload;
    },
    resetSendFriendRequest(state) {
      state.sendFriendRequest = initialState.sendFriendRequest;
    },
    resetState() {
      return initialState;
    },
  },
});
const createSliceAction = createNamespacedActionCreator(
  contactsDrawerSectionSlice
);
export const sendFriendRequest = createSliceAction<{
  userToAdd?: string;
  userToAddEmail?: string;
  userToAddUsername?: string;
}>("sendFriendRequest");

export const {
  resetState,
  setSendFriendRequestValue,
  setSendFriendRequestLoading,
  setSendFriendRequestError,
  resetSendFriendRequest,
} = contactsDrawerSectionSlice.actions;

export default contactsDrawerSectionSlice.reducer;
