import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactPreview } from "../../../types/user.types";
import type { RootState } from "../../store";

// Define a type for the slice state
type ContactsPreviewsState = {
  value: ContactPreview[];
  loading: boolean;
  error: Error | null;
  firstFetch: boolean;
};

// Define the initial state using that type
const initialState: ContactsPreviewsState = {
  value: [],
  loading: true,
  error: null,
  firstFetch: false,
};

export const contactsPreviewsSlice = createSlice({
  name: "contactsPreviews",
  initialState,
  reducers: {
    setValue(state, { payload }) {
      state.value = payload;
      state.firstFetch = true;
      state.loading = false;
    },
    addContact(state, { payload }: PayloadAction<ContactPreview>) {
      if (
        state.value != null &&
        !state.value.some((contact) => contact.id == payload.id)
      ) {
        state.value.push(payload);
      }
    },
    removeContact(state, { payload }: PayloadAction<string>) {
      if (state.value != null) {
        state.value = state.value.filter((contact) => contact.id != payload);
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

export const getValue = createAction<string>(
  `${contactsPreviewsSlice.name}/getValue`
);
export const requestRemoveFriend = createAction<string>(
  `${contactsPreviewsSlice.name}/requestRmoveFriend`
);

export const {
  setValue,
  setLoading,
  setError,
  resetState,
  addContact,
  removeContact,
} = contactsPreviewsSlice.actions;

export const selectContactsPreviews = (state: RootState) =>
  state.contactsPreviews;

export default contactsPreviewsSlice.reducer;
