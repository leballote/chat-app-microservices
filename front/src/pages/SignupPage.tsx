import { useMutation } from "@apollo/client";
import { Stack, Button, Typography, Alert } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { triggerNewNotification } from "../app/features/appView/notifications/notificationsSlice";
import {
  GenericErrorAppNotification,
  NotificationType,
} from "../app/features/appView/types";
import { appNotificationManager } from "../app/features/appView/utils";
import { SIGNUP } from "../app/graphql/mutations";
import { useAppSelector } from "../app/hooks";
import { FormCentered } from "../components/shared/FromCentered";
import EmailField from "../components/SignUpPage/fields/EmailField";
import FullNameField from "../components/SignUpPage/fields/FullNameField";
import PasswordField from "../components/SignUpPage/fields/PasswordField";
import UsernameField from "../components/SignUpPage/fields/UsernameField";

export default function SignupPage() {
  const haveError = useAppSelector(
    (state) =>
      Object.entries(state.signup.fields).reduce((acc, [, field]) => {
        return acc + field.errors.length;
      }, 0) > 0
  );

  const usernameInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [mutationFunction, { data, error }] = useMutation(SIGNUP);

  const { value: user } = useAppSelector((state) => state.currentUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      navigate("/auth/login");
    }
  }, [data]);
  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  //SUGGESTION: maybe some client side validation for the password and realtime feedback instead of on submit
  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const input = nameInput.current;

    const ev2 = new Event("change", { bubbles: true });
    input?.dispatchEvent(ev2);

    const username = usernameInput.current?.value;
    const name = nameInput.current?.value;
    const email = emailInput.current?.value;
    const password = passwordInput.current?.value;
    const confirmPassword = confirmPasswordInput.current?.value;

    const requiredInputs = {
      username,
      name,
      email,
      password,
    };
    const inputs = { ...requiredInputs };
    if (haveError) {
      console.log(haveError, Object.values(inputs));
      const notification: Omit<GenericErrorAppNotification, "id"> = {
        notificationType: NotificationType.GENERIC_ERROR,
        message: t("app.error.formNotFilled") as string,
      };
      dispatch(
        triggerNewNotification(
          appNotificationManager.createNotification({
            notification,
          })
        )
      );
      return;
    }

    if (username && password && confirmPassword && name && email) {
      try {
        await mutationFunction({ variables: { input: inputs } });
      } catch (e) {
        //error is managed by the hook
      } // eslint-disable-line
    }
  }
  return (
    <FormCentered>
      <Stack gap={2} component="form" onSubmit={handleSubmit}>
        <Typography
          variant="h4"
          fontWeight="bold"
          component="h2"
          textAlign="right"
          sx={{ marginBottom: ".5em" }}
        >
          {t("signupPage.title")}
        </Typography>

        <UsernameField inputRef={usernameInput} />
        <FullNameField inputRef={nameInput} />
        <EmailField inputRef={emailInput} />
        <PasswordField
          passwordRef={passwordInput}
          confirmPasswordRef={confirmPasswordInput}
        />

        <Button type="submit" variant="outlined">
          {t("signupPage.signupButton")}
        </Button>
        {error ? (
          <Alert severity="error">
            {t(
              [
                `errors.${error.graphQLErrors[0].extensions.code}`,
                "errors.fallback",
              ],
              {
                article: "El",
                meta: error.graphQLErrors[0].extensions.meta,
                key: Object.keys(
                  (error.graphQLErrors[0].extensions as any).meta?.keyValue ||
                    {}
                )[0],
                value: Object.values(
                  (error.graphQLErrors[0].extensions as any).meta?.keyValue ||
                    {}
                )[0],
              }
            )}
          </Alert>
        ) : null}

        <Typography textAlign="center">
          {t("signupPage.haveAnAccount")} &nbsp;
          <Link to="/auth/login">{t("signupPage.login")}!</Link>
        </Typography>
      </Stack>
    </FormCentered>
  );
}
