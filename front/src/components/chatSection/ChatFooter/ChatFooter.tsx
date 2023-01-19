import { useEffect, useRef } from "react";
import { sendMessage } from "../../../app/features/appData/currentChatSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { WithHeight } from "../../../types/utilTypes";
import { PresentationalChatFooter } from "./PresentationalChatFooter";

export type ChatFooterProps = {
  loading?: boolean;
} & WithHeight;

export function ChatFooter({ height }: ChatFooterProps) {
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
    //when entering a chat, focus the chat box
    messageTextInput.current?.focus();
  }, []);

  return (
    <PresentationalChatFooter
      height={height}
      loading={false}
      chatboxRef={messageTextInput}
      onChatboxKeyDown={handleKeyDown}
      onSendClick={handleSendClick}
    />
  );
}
