import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

// Define a type for the slice state
type ContactsPreviewsState = {
  value: ContactPreview[];
  loading: boolean;
  error: Error | null;
  searchTerm: string;
  firstFetch: boolean;
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
  firstFetch: false,
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
      state.firstFetch = true;
      state.loading = false;
    },
    addContact(state, { payload }: PayloadAction<ContactPreview>) {
      if (state.value != null) {
        state.value.push(payload);
        // return state.value.sort((a, b) => {
        //   return a.name > b.name ? 1 : -1;
        // });
      }
    },
    setLoading(state, { payload = true }: PayloadAction<boolean>) {
      state.loading = payload;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
    resetState(state) {
      return initialState;
    },
  },
});

export const {
  setValue,
  getValue,
  setLoading,
  setError,
  setSearchTerm,
  resetState,
  addContact,
} = contactsPreviewsSlice.actions;

export const selectContactsPreviews = (state: RootState) =>
  state.contactsPreviews;

export default contactsPreviewsSlice.reducer;
