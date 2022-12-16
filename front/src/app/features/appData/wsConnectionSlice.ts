import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type WsConnectionState = {
  connected: boolean;
};

const initialState: WsConnectionState = {
  connected: true,
};

export const wsConnectionSlice = createSlice({
  name: "wsConnection",
  initialState,
  reducers: {
    setWsConnected(state, { payload }: PayloadAction<boolean>) {
      state.connected = payload;
    },
    resetState() {
      return initialState;
    },
  },
});

export const { setWsConnected, resetState } = wsConnectionSlice.actions;

export default wsConnectionSlice.reducer;
