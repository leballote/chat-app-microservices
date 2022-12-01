import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
type FriendRequestsPreviewsState = {
  value: {
    [id: string]: FriendRequestPreview;
  };
  loading: boolean;
  error: Error | null;
  firstFetch: boolean;
};

//TODO: maybe define this in the types directory?
type FriendRequestPreview = {
  user: {
    id: string;
    name: string;
    username: string;
    avatar: string;
    phrase: string;
  };
  sentAt: string;
  accepting?: boolean;
  rejecting?: boolean;
  error: Error | null;
};

// Define the initial state using that type
const initialState: FriendRequestsPreviewsState = {
  value: {},
  loading: false,
  error: null,
  firstFetch: false,
};

export const friendRequestsPreviewsSlice = createSlice({
  name: "friendRequestsPreviews",
  initialState,
  reducers: {
    getValue(state) {
      state.loading = true;
    },
    setValue(state, { payload }) {
      state.value = payload;
      state.firstFetch = true;
      state.loading = false;
    },
    acceptFriendRequest(_, _action: PayloadAction<string>) {},
    rejectFriendRequest(_, _action: PayloadAction<string>) {},
    removeFriendRequest(state, { payload }: PayloadAction<string>) {
      if (state.value[payload]) {
        delete state.value[payload];
      }
    },
    addFriendRequest(state, { payload }: PayloadAction<FriendRequestPreview>) {
      if (state.value) {
        state.value[payload.user.id] = payload;
      }
    },
    setFriendRequestToAccepting(
      state,
      { payload }: PayloadAction<{ id: string; accepting: boolean }>
    ) {
      if (state.value[payload.id]) {
        state.value[payload.id].accepting = payload.accepting;
      }
    },
    setFriendRequestToRejected(
      state,
      { payload }: PayloadAction<{ id: string; rejecting: boolean }>
    ) {
      if (state.value[payload.id]) {
        state.value[payload.id].accepting = payload.rejecting;
      }
    },
    setLoading(state, { payload = true }: PayloadAction<boolean>) {
      state.loading = payload;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  setValue,
  getValue,
  setLoading,
  setError,
  resetState,
  acceptFriendRequest,
  rejectFriendRequest,
  addFriendRequest,
  removeFriendRequest,
  setFriendRequestToAccepting,
  setFriendRequestToRejected,
} = friendRequestsPreviewsSlice.actions;

export default friendRequestsPreviewsSlice.reducer;
