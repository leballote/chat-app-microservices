import { Box } from "@mui/material";

type Props = React.ComponentProps<typeof Box>;

export function BottomElement({ children, ...props }: Props) {
  return (
    <Box
      sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
      {...props}
      // elevation={elevation}
    >
      {children}
    </Box>
  );
}
