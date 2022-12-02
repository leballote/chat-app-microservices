import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";

export default function ErrorChat() {
  return (
    <Box
      sx={{
        fontSize: "4rem",
        margin: "1em",
        fontWeight: "bold",
        color: red[400],
      }}
    >
      Oops! something went wrong
    </Box>
  );
}
