import { Box, TextField } from "@mui/material";
import { useRef } from "react";

export default function LoginPage() {
  const usernameInput = useRef(null);
  const passwordInput = useRef(null);

  return (
    <Box component="form">
      <TextField placeholder="username" inputRef={usernameInput} />
      <TextField placeholder="password" inputRef={passwordInput} />
    </Box>
  );
}
