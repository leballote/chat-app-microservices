import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  setFieldErrors,
  triggerDebounceSetFieldErrors,
} from "../../../app/features/appView/signup/signupSlice";
import { useAppSelector } from "../../../app/hooks";

type Props = {
  inputRef?: React.ComponentProps<typeof TextField>["inputRef"];
};

export default function UsernameField({ inputRef }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const errors = useAppSelector((state) => state.signup.fields.username.errors);

  function handleChange(
    ev: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const username = ev.currentTarget.value;
    const newErrors = [] as string[];
    if (/\s/.test(username)) {
      newErrors.push(t("app.error.usernameContainsSpaces"));
    }
    if (username == "") {
      newErrors.push(t("app.error.usernameEmpty"));
    }

    if (errors.length > newErrors.length) {
      dispatch(setFieldErrors({ field: "username", errors: newErrors }));
    } else {
      dispatch(
        triggerDebounceSetFieldErrors({
          field: "username",
          errors: newErrors,
        })
      );
    }
  }

  return (
    <TextField
      label={t("user.username")}
      required
      inputProps={{ maxLength: 20, onChange: handleChange }}
      inputRef={inputRef}
      error={errors.length > 0}
      helperText={errors.join(". ")}
    />
  );
}
