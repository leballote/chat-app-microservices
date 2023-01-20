import { useMutation } from "@apollo/client";
import { TextField, Stack, Button, Typography, Alert } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { setError } from "../app/features/appData/chatsPreviewsSlice";
import { SIGNUP } from "../app/graphql/mutations";
import { useAppSelector } from "../app/hooks";
import { FormCentered } from "../components/shared/FromCentered";

export default function SignupPage() {
  const usernameInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const [mutationFunction, { data, error }] = useMutation(SIGNUP);

  const [clientError, setClientError] = useState<{
    message: string;
    code: string;
    meta?: object;
  } | null>(null);

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
    const username = usernameInput.current?.value;
    const name = nameInput.current?.value;
    const email = emailInput.current?.value;
    const password = passwordInput.current?.value;
    const confirmPassword = confirmPasswordInput.current?.value;
    if (password !== confirmPassword) {
      setClientError({
        message: "Passwords don't match",
        code: "PASSWORDS_DONT_MATCH",
      });
      setError(undefined);
      return;
    } else {
      setClientError(null);
    }

    const requiredInputs = {
      username,
      name,
      email,
      password,
    };
    const inputs = { ...requiredInputs };
    if (Object.values(inputs).some((el) => el == null)) {
      return;
    }

    if (username && password && confirmPassword && name && email) {
      try {
        await mutationFunction({ variables: { input: inputs } });
      } catch (e) {
        // disable-eslint-line
        //this is handeled by the hook already
      }
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
        <TextField
          label={t("user.username")}
          required
          inputProps={{ maxLength: 20 }}
          inputRef={usernameInput}
        />
        <TextField
          label={t("user.fullName")}
          inputProps={{ maxLength: 120 }}
          required
          inputRef={nameInput}
        />
        <TextField
          label={t("user.email")}
          type="email"
          required
          inputProps={{ maxLength: 320 }}
          inputRef={emailInput}
        />

        <TextField
          label={t("user.password")}
          required
          type="password"
          inputRef={passwordInput}
          inputProps={{ maxLength: 300 }}
        />
        <TextField
          label={t("signupPage.confirmPassword")}
          required
          type="password"
          inputProps={{ maxLength: 300 }}
          inputRef={confirmPasswordInput}
        />
        <Button type="submit" variant="outlined">
          {t("signupPage.signupButton")}
        </Button>
        {clientError ? (
          <Alert severity="error">
            {t(`errors.${clientError.code}`, { meta: clientError.meta })}
          </Alert>
        ) : null}
        {error && !clientError ? (
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
