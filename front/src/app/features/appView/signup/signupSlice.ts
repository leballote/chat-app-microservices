import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createNamespacedActionCreator } from "../../../utils";

export type SignupState = {
  fields: {
    username: {
      errors: string[];
    };
    name: {
      errors: string[];
    };
    email: {
      errors: string[];
    };
    password: {
      errors: string[];
    };
    confirmPassword: {
      errors: string[];
    };
  };
};

// Define the initial state using that type
const initialState: SignupState = {
  fields: {
    username: {
      errors: [],
    },
    name: {
      errors: [],
    },
    email: {
      errors: [],
    },
    password: {
      errors: [],
    },
    confirmPassword: {
      errors: [],
    },
  },
};

export type PartialErrors = {
  username?: string[];
  name?: string[];
  email?: string[];
  password?: string[];
  confirmPassword?: string[];
};

export type FieldErrors = {
  field: string;
  errors: string[];
};

export const signupSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    setErrors(state, { payload }: PayloadAction<PartialErrors>) {
      for (const key in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
          const field = key as keyof typeof payload;
          const errors = payload[field] ?? [];
          state.fields[field].errors = errors;
        }
      }
    },
    setFieldErrors(state, { payload }: PayloadAction<FieldErrors>) {
      const field = payload.field as keyof typeof state.fields;
      state.fields[field].errors = payload.errors;
    },
    resetState() {
      return initialState;
    },
  },
});
const sliceCreateAction = createNamespacedActionCreator(signupSlice);

export const triggerDebounceSetFieldErrors = sliceCreateAction<FieldErrors>(
  "triggerDebounceSetFieldErrors"
);

export const triggerDebounceSetErrors = sliceCreateAction<PartialErrors>(
  "triggerDebounceSetErrors"
);

export const triggerInstantSetErrors = sliceCreateAction<PartialErrors>(
  "triggerInstantSetErrors"
);

export const { resetState, setFieldErrors, setErrors } = signupSlice.actions;

export default signupSlice.reducer;
