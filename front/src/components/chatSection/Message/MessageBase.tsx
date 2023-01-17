import { Box } from "@mui/material";

type Props = {
  isOwnedByMe: boolean;
  children?: React.ReactNode;
  maxWidth: string | number;
};

export function MessageBase({ isOwnedByMe, children, maxWidth }: Props) {
  return (
    <Box
      maxWidth={maxWidth}
      borderRadius="5px"
      sx={{
        bgcolor: isOwnedByMe ? "primary.main" : "primary.light",
        alignSelf: isOwnedByMe ? "flex-end" : "flex-start",
      }}
    >
      {children}
    </Box>
  );
}
