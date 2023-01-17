import SendIcon from "@mui/icons-material/Send";
import { Button, Paper, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useEffect, useRef } from "react";
import { sendMessage } from "../../app/features/appData/currentChatSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { WithHeight } from "../../types/utilTypes";

export type ChatFooterProps = {
  loading?: boolean;
} & WithHeight;

export function ChatFooter({ height, loading = false }: ChatFooterProps) {
  const dispatch = useAppDispatch();
  const { value: chat } = useAppSelector((state) => state.currentChat);
  if (!chat) return null;
  const { id: chatId } = chat;
  const { value: user } = useAppSelector((state) => state.currentUser);
  const messageTextInput = useRef<HTMLInputElement>(null);

  function clearInput() {
    if (messageTextInput.current?.value) {
      messageTextInput.current.value = "";
    }
  }

  function triggerSendMessage() {
    //the last condition is not really necessary, but I think it makes it more explicit
    if (
      user &&
      messageTextInput.current?.value &&
      messageTextInput.current.value.length > 0
    ) {
      dispatch(
        sendMessage({
          chatId,
          content: messageTextInput.current?.value,
          sentAt: new Date().toISOString(),
          sentBy: user?.id,
        })
      );
    }
    clearInput();
  }

  function handleSendClick() {
    triggerSendMessage();
  }

  function handleEnter() {
    triggerSendMessage();
  }

  function handleEscape() {
    clearInput();
  }

  function handleKeyDown(ev: React.KeyboardEvent<HTMLInputElement>) {
    if (ev.key === "Escape") {
      handleEscape();
    } else if (ev.key === "Enter") {
      handleEnter();
    }
  }

  useEffect(() => {
    messageTextInput.current?.focus();
  }, []);

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
          sx={{ width: "50%", bgcolor: "white" }}
          // ref={messageTextInput}
          InputProps={{ onKeyDown: handleKeyDown }}
          inputProps={{ maxLength: 1000 }}
          inputRef={messageTextInput}
          disabled={loading}
        />
        <Button
          sx={{
            aspectRatio: "1 / 1",
            bgcolor: "whitesmoke",
            "&:hover": {
              bgcolor: "#EEEEEE",
            },
          }}
          onClick={handleSendClick}
          disabled={loading}
        >
          <SendIcon />
        </Button>
      </Stack>
    </Paper>
  );
}
