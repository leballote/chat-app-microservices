import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store";
import { User } from "../../../types/user.types";
import { createNamespacedActionCreator } from "../../utils";

// Define a type for the slice state
type UserState = {
  value: User;
  loading: boolean;
  error: Error | null;
  firstFetch: boolean;
};

// Define the initial state using that type
const initialState: UserState = {
  value: null,
  loading: false,
  error: null,
  firstFetch: false,
};

export const userSlice = createSlice({
  name: "currentUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setValue(state, { payload }) {
      state.value = payload;
      state.loading = false;
    },
    setLoading(state, { payload = true }: PayloadAction<boolean>) {
      state.loading = payload;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
    setFirstFetch(state, { payload }) {
      state.firstFetch = payload;
    },
  },
});
const sliceCreateAction = createNamespacedActionCreator(userSlice);

export const getValue = sliceCreateAction<void>("getValue");

export const { setValue, setLoading, setError, setFirstFetch } =
  userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentUser = (state: RootState) => state.currentUser;

export default userSlice.reducer;
