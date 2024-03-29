import { TextField } from "@mui/material";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import isEmail from "validator/lib/isEmail";
import {
  setFieldErrors,
  triggerDebounceSetFieldErrors,
} from "../../../app/features/appView/signup/signupSlice";
import { useAppSelector } from "../../../app/hooks";

type Props = {
  inputRef?: React.ComponentProps<typeof TextField>["inputRef"];
};

export default function EmailField({ inputRef }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const errors = useAppSelector((state) => state.signup.fields.email.errors);

  function handleChange(
    ev: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const email = ev.currentTarget.value;
    const newErrors = validateEmail(email, t);

    if (errors.length > newErrors.length) {
      dispatch(setFieldErrors({ field: "email", errors: newErrors }));
    } else {
      dispatch(
        triggerDebounceSetFieldErrors({
          field: "email",
          errors: newErrors,
        })
      );
    }
  }

  function onBlur(ev: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) {
    const email = ev.currentTarget.value;
    const newErrors = validateEmail(email, t);
    dispatch(setFieldErrors({ field: "email", errors: newErrors }));
  }

  return (
    <TextField
      label={t("user.email")}
      type="email"
      required
      inputProps={{ maxLength: 320, onChange: handleChange, onBlur: onBlur }}
      inputRef={inputRef}
      error={errors.length > 0}
      helperText={errors.join(". ")}
    />
  );
}

function validateEmail(email: string, t: TFunction) {
  const newErrors = [] as string[];
  if (!isEmail(email)) {
    newErrors.push(t("app.error.notValidEmail"));
  }
  return newErrors;
}
