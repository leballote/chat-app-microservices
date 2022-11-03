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

const SIGNUP = gql`
  mutation Signup($input: SignUpInput) {
    signup(input: $input) {
      success
    }
  }
`;

export default function SignupPage() {
  const usernameInput = useRef<HTMLInputElement>(null);
  const nameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);
  //TODO: move this into a saga
  const [mutationFunction, { data, loading, error }] = useMutation(SIGNUP);
  console.log("ERROR", error);

  //TODO client side validation
  function handleSubmit(ev: React.FormEvent<HTMLInputElement>) {
    ev.preventDefault();
    const username = usernameInput.current?.value;
    const name = nameInput.current?.value;
    const email = emailInput.current?.value;
    const password = passwordInput.current?.value;
    const confirmPassword = passwordInput.current?.value;
    //TODO: Maybe this is not needed with the validations
    //TODO: Validate email
    if (password !== confirmPassword) return;

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
      mutationFunction({ variables: { input: inputs } });
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
    >
      <Paper elevation={3} sx={{ padding: "2em" }}>
        <Stack
          gap={2}
          component="form"
          //TODO: solve this any
          onSubmit={handleSubmit as any}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            component="h2"
            textAlign="right"
            sx={{ marginBottom: ".5em" }}
          >
            Sign Up
          </Typography>
          <TextField label="Username" required inputRef={usernameInput} />
          <TextField label="Full Name" required inputRef={nameInput} />
          <TextField label="email" required inputRef={emailInput} />

          <TextField
            label="Password"
            required
            type="password"
            inputRef={passwordInput}
          />
          <TextField
            label="Confirm password"
            required
            type="password"
            inputRef={confirmPasswordInput}
          />
          <Button type="submit" variant="outlined">
            Sign Up
          </Button>
          <Typography textAlign="center">
            Have an account? &nbsp;
            <Link to="/auth/login">Log In</Link>
          </Typography>
        </Stack>
      </Paper>
    </Container>
  );
}
