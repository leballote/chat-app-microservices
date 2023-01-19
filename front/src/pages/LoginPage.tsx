import { useMutation } from "@apollo/client";
import { TextField, Stack, Button, Typography, Alert } from "@mui/material";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { getValue as getCurrentUserValue } from "../app/features/appData/currentUserSlice";
import { LOGIN } from "../app/graphql/mutations";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { FormCentered } from "../components/shared/FromCentered";

export default function LoginPage() {
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [mutationFunction, { error }] = useMutation(LOGIN, {
    fetchPolicy: "no-cache",
  });
  const user = useAppSelector((state) => state.currentUser.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleSubmit(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const username = usernameInput.current?.value;
    const password = passwordInput.current?.value;
    if (!username || !password) {
      return;
    }

    try {
      await mutationFunction({
        variables: { username, password },
      });
      dispatch(getCurrentUserValue());
    } catch (e) {} //eslint-disable-line
  }

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

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
          {t("loginPage.title")}
        </Typography>
        <TextField
          label={t("user.username")}
          required
          inputRef={usernameInput}
          inputProps={{ maxLength: 60 }}
        />

        <TextField
          label={t("user.password")}
          required
          type="password"
          inputRef={passwordInput}
          inputProps={{ maxLength: 300 }}
        />
        <Button type="submit" variant="outlined">
          {t("loginPage.loginButton")}
        </Button>
        {error ? (
          <Alert severity="error">
            {t([
              `errors.${error.graphQLErrors[0].extensions.code}`,
              "errors.fallback",
            ])}
          </Alert>
        ) : null}
        <Typography textAlign="center">
          {t("loginPage.dontHaveAnAccount")} &nbsp;
          <Link to="/auth/signup">{t("loginPage.signup")}</Link>
        </Typography>
      </Stack>
    </FormCentered>
  );
}
