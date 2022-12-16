import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppError } from "../types";

type AuthState = {
  logoutAction: {
    value: LogoutResponse | null;
    loading: boolean;
    error: AppError;
  };
};

type LogoutResponse = {
  success: boolean;
};

const initialState: AuthState = {
  logoutAction: {
    value: null,
    loading: false,
    error: null,
  },
};

export const authSlice = createSlice({
  name: "chatDetailsModalSection",
  initialState,
  reducers: {
    triggerLogout() {},
    setLogoutActionValue(
      state,
      { payload }: PayloadAction<LogoutResponse | null>
    ) {
      state.logoutAction.value = payload;
    },
    setLogoutActionError(state, { payload }: PayloadAction<AppError>) {
      state.logoutAction.error = payload;
    },
    setLououtActionLoading(state, { payload }: PayloadAction<boolean>) {
      state.logoutAction.loading = payload;
    },
  },
});

export const {
  triggerLogout,
  setLogoutActionError,
  setLogoutActionValue,
  setLououtActionLoading,
} = authSlice.actions;

export default authSlice.reducer;
