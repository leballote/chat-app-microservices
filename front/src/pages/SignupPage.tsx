import { SettingsInputAntenna } from "@mui/icons-material";
import { FormHelperText, useFormControl } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useState, useMemo } from "react";

function isValidEmail(email: string) {
  return email.includes("@");
}

function Helper() {
  const { focused } = useFormControl() || {};
  const text = useMemo(() => {
    if (focused) {
      return "hello";
    }
    return "";
  }, [focused]);
  return <FormHelperText>{text}</FormHelperText>;
}

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const handleChange = (ev: any) => {
    setEmail(ev.target.value);
    if (!isValidEmail(ev.target.value)) {
      console.log("not valid email dude!");
    }
  };
  return (
    <div>
      <TextField
        id="email-field"
        label="Email"
        value={email}
        placeholder="Your email"
        onChange={handleChange}
      />
      <Helper />
    </div>
  );
};

export default SignupPage;
