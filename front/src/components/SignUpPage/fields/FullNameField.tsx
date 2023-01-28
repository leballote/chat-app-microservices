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

export default function FullNameField({ inputRef }: Props) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const errors = useAppSelector((state) => state.signup.fields.name.errors);

  function handleChange(
    ev: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const name = ev.currentTarget.value;
    const leadingOrTrailingSpacesError = !new RegExp(
      "^(?!\\s)(.*)(?<!\\s)$"
    ).test(name);
    const twoConsecutiveSpacesError = new RegExp("\\s{2,}").test(name);

    const newErrors = [] as string[];
    if (name.length == 0) {
      newErrors.push(t("app.error.nameEmpty"));
    }
    if (leadingOrTrailingSpacesError) {
      newErrors.push(t("app.error.nameLeadingOrTrailingSpaces"));
    }
    if (twoConsecutiveSpacesError) {
      newErrors.push(t("app.error.nameTwoConsecutiveSpaces"));
    }

    if (errors.length > newErrors.length) {
      dispatch(setFieldErrors({ field: "name", errors: newErrors }));
    } else {
      dispatch(
        triggerDebounceSetFieldErrors({
          field: "name",
          errors: newErrors,
        })
      );
    }
  }

  return (
    <TextField
      label={t("user.fullName")}
      inputProps={{
        maxLength: 120,
        onChange: handleChange,
      }}
      required
      inputRef={inputRef}
      error={errors.length > 0}
      helperText={errors.join(". ")}
    />
  );
}
