import { useQuery, gql, useMutation } from "@apollo/client";
import {
  Box,
  TextField,
  Stack,
  Container,
  Button,
  Paper,
  Typography,
} from "@mui/material";
import { useRef } from "react";
import { Link } from "react-router-dom";

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
  const [mutationFunction, { data, loading, error }] = useMutation(LOGIN);

  function handleSubmit(ev: React.FormEvent<HTMLInputElement>) {
    ev.preventDefault();
    const username = usernameInput.current?.value;
    const password = passwordInput.current?.value;
    if (username && password) {
      mutationFunction({ variables: { username, password } });
    }
  }

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
            Log In
          </Typography>
          <TextField
            // placeholder="Username"
            label="Username"
            required
            inputRef={usernameInput}
          />

          <TextField
            label="Password"
            // placeholder="Password"
            required
            type="password"
            inputRef={passwordInput}
          />
          <Button type="submit" variant="outlined">
            Log In
          </Button>
          <Typography textAlign="center">
            Have an account? &nbsp;
            <Link to="/auth/signup">Sign Up</Link>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
