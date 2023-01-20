import { Button, Paper, Stack, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { TFunction } from "i18next";
import { useTranslation } from "react-i18next";

type Props = {
  height: string | number;
  chatboxRef?: React.Ref<any>;
  onChatboxKeyDown?: React.KeyboardEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  maxReached?: boolean;
  closeToMaxReached?: boolean;
  onSendClick?: React.MouseEventHandler<HTMLButtonElement>;
  onInputChange?: React.FormEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  >;
  loading: boolean;
};

export function PresentationalChatFooter({
  height,
  chatboxRef,
  onChatboxKeyDown,
  onInputChange,
  onSendClick,
  loading = false,
  maxReached = false,
  closeToMaxReached = false,
}: Props) {
  const { t } = useTranslation();
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
          // error={}
          helperText={pickLabel(maxReached, closeToMaxReached)(t)}
          // error
          color={pickColor(maxReached, closeToMaxReached)}
          multiline
          maxRows={3}
          sx={{
            width: "50%",
            bgcolor: "primary.contrastText",
          }}
          // ref={messageTextInput}
          InputProps={{ onKeyDown: onChatboxKeyDown }}
          inputProps={{
            maxLength: 1000,
            onChange: onInputChange,
          }}
          inputRef={chatboxRef}
          disabled={loading}
        />
        <Button
          sx={{
            aspectRatio: "1 / 1",
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

function pickColor(maxReached: boolean, closeToMaxReached: boolean) {
  if (maxReached) {
    return "error";
  } else if (closeToMaxReached) {
    return "warning";
  } else {
    return "primary";
  }
}

function pickLabel(maxReached: boolean, closeToMaxReached: boolean) {
  if (maxReached) {
    return (t: TFunction) => t("app.error.maxMessageLengthReached");
  } else if (closeToMaxReached) {
    return (t: TFunction) => t("app.warning.closeToMaxMessageLengthReached");
  } else {
    return () => undefined;
  }
}
