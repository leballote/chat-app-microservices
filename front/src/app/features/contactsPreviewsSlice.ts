import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
type ContactsPreviewsState = {
  value: ContactPreview[];
  loading: boolean;
  error: Error | null;
  searchTerm: string;
};

//TODO: maybe define this in the types directory?
type ContactPreview = {
  id: string;
  name: string;
  avatar: string;
  phrase: string;
  status: "ONLINE" | "OFFLINE";
};

// Define the initial state using that type
const initialState: ContactsPreviewsState = {
  value: [],
  searchTerm: "",
  loading: true,
  error: null,
};

export const contactsPreviewsSlice = createSlice({
  name: "contactsPreviews",
  initialState,
  reducers: {
    getValue(state, action: PayloadAction<string>) {
      state.loading = true;
    },
    setSearchTerm(state, { payload }) {
      state.searchTerm = payload;
      //TODO: check if this is the way to do it
      contactsPreviewsSlice.actions.getValue(payload);
    },
    setValue(state, { payload }) {
      state.value = payload;
      state.loading = false;
    },
    setLoading(state) {
      state.loading = true;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const { setValue, getValue, setLoading, setError, setSearchTerm } =
  contactsPreviewsSlice.actions;

export const selectContactsPreviews = (state: RootState) =>
  state.contactsPreviews;

export default contactsPreviewsSlice.reducer;
