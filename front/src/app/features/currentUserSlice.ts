import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";
import { User } from "../../types/AppTypes";

// Define a type for the slice state
type UserState = {
  value: User;
  loading: boolean;
  error: Error | null;
};

// Define the initial state using that type
const initialState: UserState = { value: null, loading: true, error: null };

export const userSlice = createSlice({
  name: "currentUser",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    getValue() {},
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
  },
});

export const { setValue, getValue, setLoading, setError } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCurrentUser = (state: RootState) => state.currentUser;

export default userSlice.reducer;
