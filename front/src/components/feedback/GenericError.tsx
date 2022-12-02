import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";

export default function GenericError() {
  return (
    <Box sx={{ margin: "1em", color: red[400] }}>
      <Typography>{"Sorry! something went wrong!"}</Typography>
    </Box>
  );
}
