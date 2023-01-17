import { Button, Paper, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  height: string | number;
  chatboxRef?: React.Ref<any>;
  onChatboxKeyDown?: React.KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  onSendClick?: React.MouseEventHandler<HTMLButtonElement>;
  loading: boolean;
};

export function PresentationalChatFooter({
  height,
  chatboxRef,
  onChatboxKeyDown,
  onSendClick,
  loading = false,
}: Props) {
  return (
    <Paper
      elevation={2}
      sx={{
        height,
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        height="100%"
        width="100%"
        gap={2}
      >
        <TextField
          sx={{ width: "50%", bgcolor: "primary.contrastText" }}
          // ref={messageTextInput}
          InputProps={{ onKeyDown: onChatboxKeyDown }}
          inputProps={{ maxLength: 1000 }}
          inputRef={chatboxRef}
          disabled={loading}
        />
        <Button
          sx={{
            aspectRatio: "1 / 1",
            // bgcolor: "whitesmoke",
            // "&:hover": {
            //   bgcolor: "#EEEEEE",
            // },
          }}
          onClick={onSendClick}
          disabled={loading}
        >
          <SendIcon />
        </Button>
      </Stack>
    </Paper>
  );
}
