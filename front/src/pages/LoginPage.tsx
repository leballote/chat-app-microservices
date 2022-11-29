import { useQuery, gql, useMutation } from "@apollo/client";
import {
  Box,
  TextField,
  Stack,
  Container,
  Button,
  Paper,
  Typography,
  Alert,
} from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { getValue as getCurrentUserValue } from "../app/features/currentUserSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { CurrentUserContext } from "../contexts";
import { red } from "@mui/material/colors";

const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      success
    }
  }
`;

export default function LoginPage() {
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  //TODO: move this into a saga
  const [mutationFunction, { data, loading, error  }] = useMutation(LOGIN);
  console.log({ LOGIN_DATA: data, LOGIN_LOADING: loading, LOGIN_ERROR: error });
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

    await mutationFunction({ variables: { username, password } });
    dispatch(getCurrentUserValue());
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
          />

          <TextField
            label={t("user.password")}
            // placeholder="Password"
            required
            type="password"
            inputRef={passwordInput}
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
