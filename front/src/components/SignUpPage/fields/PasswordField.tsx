import { TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {
  setErrors,
  triggerDebounceSetErrors,
} from "../../../app/features/appView/signup/signupSlice";
import { useAppSelector } from "../../../app/hooks";
import isStrongPassword from "validator/lib/isStrongPassword";
import { useRef } from "react";
import { TFunction } from "i18next";

export default function PasswordField() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const passwordErrors = useAppSelector(
    (state) => state.signup.fields.password.errors
  );
  const confirmPasswordErrors = useAppSelector(
    (state) => state.signup.fields.confirmPassword.errors
  );

  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);

  function handlePasswordChange(
    ev: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const password = ev.currentTarget.value;
    const confirmPassword = confirmPasswordInput.current?.value;

    const passwordNewErrors = checkPasswordErrors(password, t);
    const confirmPasswordNewErrors =
      //this second condition is not necesarry but for me is more explicit
      confirmPassword && confirmPassword.length > 0
        ? checkConfirmPasswordErrors(password, confirmPassword, t)
        : [];

    if (
      //an error was solved
      passwordErrors.length > passwordNewErrors.length ||
      confirmPasswordErrors.length > confirmPasswordNewErrors.length
    ) {
      dispatch(
        triggerDebounceSetErrors({
          password: passwordNewErrors,
          confirmPassword: confirmPasswordNewErrors,
        })
      );

      dispatch(
        //instant
        setErrors({
          password: passwordNewErrors,
          confirmPassword: confirmPasswordNewErrors,
        })
      );
    } else {
      //debounce
      dispatch(
        triggerDebounceSetErrors({
          password: passwordNewErrors,
          confirmPassword: confirmPasswordNewErrors,
        })
      );
    }
  }

  function handleConfirmPasswordChange(
    ev: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    const confirmPassword = ev.currentTarget.value;
    const password = passwordInput.current?.value;
    if (password != undefined) {
      const confirmPasswordNewErrors = checkConfirmPasswordErrors(
        password,
        confirmPassword,
        t
      );
      if (confirmPasswordErrors.length > confirmPasswordNewErrors.length) {
        dispatch(
          triggerDebounceSetErrors({
            confirmPassword: confirmPasswordNewErrors,
          })
        );
        dispatch(
          setErrors({
            confirmPassword: confirmPasswordNewErrors,
          })
        );
      } else {
        dispatch(
          triggerDebounceSetErrors({
            confirmPassword: confirmPasswordNewErrors,
          })
        );
      }
    }
  }

  return (
    <>
      <TextField
        label={t("user.password")}
        required
        // type="password"
        inputRef={passwordInput}
        inputProps={{ maxLength: 300, onChange: handlePasswordChange }}
        error={passwordErrors.length > 0}
        helperText={passwordErrors[0]}
      />
      <TextField
        label={t("signupPage.confirmPassword")}
        required
        // type="password"
        inputProps={{ maxLength: 300, onChange: handleConfirmPasswordChange }}
        inputRef={confirmPasswordInput}
        error={confirmPasswordErrors.length > 0}
        helperText={confirmPasswordErrors[0]}
      />
    </>
  );
}

function checkPasswordErrors(password: string, t: TFunction): string[] {
  const newErrors = [] as string[];
  if (password.length == 0) {
    newErrors.push(t("app.error.passwordEmpty"));
  }
  if (!isStrongPassword(password)) {
    newErrors.push(t("app.error.passwordWeak"));
  }

  return newErrors;
}

function checkConfirmPasswordErrors(
  password: string,
  confirmPassword: string,
  t: TFunction
): string[] {
  const newErrors = [] as string[];

  if (confirmPassword !== password) {
    console.log(confirmPassword, password);
    newErrors.push(t("app.error.confirmPasswordNotSame"));
  }

  return newErrors;
}
