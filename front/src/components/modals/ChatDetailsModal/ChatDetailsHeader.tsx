import { Box, Typography, DialogTitle, Avatar } from "@mui/material";

export function ChatDetailsHeader({
  name,
  avatar,
  phrase,
}: ChatDetailsHeaderProps) {
  return (
    <Box>
      <Avatar src={avatar} sx={{ width: 150, height: 150, margin: "0 auto" }} />
      <Box>
        <DialogTitle>
          <Typography
            textAlign="center"
            sx={{
              wordWrap: "break-word",
              fontSize: defineFontSizeName(name),
            }}
          >
            {name}
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              wordWrap: "break-word",
              fontSize: defineFontSizePhrase(name),
            }}
          >
            {phrase}
          </Typography>
        </DialogTitle>
      </Box>
    </Box>
  );
}

export type ChatDetailsHeaderProps = {
  name: string;
  avatar?: string;
  phrase: string;
};

export function defineFontSizeName(name: string) {
  const length = name.length;
  if (length > 100) {
    return "1.2em";
  }
  if (length > 75) {
    return "1.1em";
  }
  if (length > 50) {
    return "1.6em";
  }
  return "1.8em";
}

export function defineFontSizePhrase(phrase: string) {
  const length = phrase.length;
  if (length > 50) {
    return ".8em";
  }
  return "1.1em";
}
