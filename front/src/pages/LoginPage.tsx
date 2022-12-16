import { gql, useMutation } from "@apollo/client";
import {
  TextField,
  Stack,
  Container,
  Button,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import { createClient } from "graphql-ws";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { getValue as getCurrentUserValue } from "../app/features/appData/currentUserSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import client, { wsClient, wsLink } from "../client";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      success
    }
  }
`;

export default function LoginPage() {
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  //TODO: move this into a saga
  const [mutationFunction, { data, loading, error }] = useMutation(LOGIN, {
    fetchPolicy: "no-cache",
  });
  // const user = useContext(CurrentUserContext);
  const user = useAppSelector((state) => state.currentUser.value);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  async function handleSubmit(ev: React.FormEvent<HTMLInputElement>) {
    ev.preventDefault();
    const username = usernameInput.current?.value;
    const password = passwordInput.current?.value;
    if (!username || !password) {
      return;
    }

    try {
      const loginResponse = await mutationFunction({
        variables: { username, password },
      });
      dispatch(getCurrentUserValue());
    } catch (e) {}
  }

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user]);

  return (
    <Container
      sx={{
        width: "40%",
        minHeight: "100vh",
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "center",
      }}
      component="form"
      //TODO: solve this any
      onSubmit={handleSubmit as any}
    >
      <Paper elevation={3} sx={{ padding: "2em" }}>
        <Stack gap={2}>
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
            // placeholder="Username"
            label={t("user.username")}
            required
            inputRef={usernameInput}
            inputProps={{ maxLength: 60 }}
          />

          <TextField
            label={t("user.password")}
            // placeholder="Password"
            required
            type="password"
            inputRef={passwordInput}
            inputProps={{ maxLength: 300 }}
          />
          <Button type="submit" variant="outlined">
            {t("loginPage.loginButton")}
          </Button>
          {error ? <Alert severity="error">{error.message}</Alert> : null}
          <Typography textAlign="center">
            {t("loginPage.dontHaveAnAccount")} &nbsp;
            <Link to="/auth/signup">{t("loginPage.signup")}</Link>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
