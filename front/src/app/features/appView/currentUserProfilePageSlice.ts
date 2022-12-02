import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ProfiledUser = {
  id: string;
  name: string;
  phrase: string;
  avatar?: string;
  status: "OFFLINE" | "ONLINE";
};

// Define a type for the slice state
type currentUserProfilePageState = {
  value: ProfiledUser | null;
  loading: boolean;
  error: Error | null;
};

// Define the initial state using that type
const initialState: currentUserProfilePageState = {
  value: null,
  loading: true,
  error: null,
};

export const currentUserProfilePage = createSlice({
  name: "currentUserProfilePage",
  initialState,
  reducers: {
    getValue(state, _action: PayloadAction<string>) {
      //TODO: not sure if this is needed
      state.loading = true;
    },
    setValue(state, { payload }: PayloadAction<ProfiledUser | null>) {
      state.value = payload;
      state.loading = false;
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

export const { setValue, getValue, setLoading, setError, resetState } =
  currentUserProfilePage.actions;

export default currentUserProfilePage.reducer;
