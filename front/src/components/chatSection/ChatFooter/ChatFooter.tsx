import React, { useEffect, useRef, useState } from "react";
import { sendMessage } from "../../../app/features/appData/currentChatSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { WithHeight } from "../../../types/utilTypes";
import { PresentationalChatFooter } from "./PresentationalChatFooter";

export type ChatFooterProps = {
  loading?: boolean;
} & WithHeight;

export function ChatFooter({ height }: ChatFooterProps) {
  const userId = useAppSelector((state) => state.currentUser.value?.id);
  const [maxReached, setMaxReached] = useState<boolean>(false);
  const [closeToMaxReached, setCloseToMaxReached] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const chatId = useAppSelector((state) => state.currentChat.value?.id);
  if (chatId == undefined) return null;
  const messageTextInput = useRef<HTMLInputElement>(null);

  function clearInput() {
    if (messageTextInput.current?.value) {
      messageTextInput.current.value = "";
      const e = new Event("change");
      messageTextInput.current.dispatchEvent(e);
    }
  }

  function onInputChange(
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    console.log(
      "ev triggered",
      messageTextInput.current?.value.substring(0, 10)
    );
    if (ev) {
      if (messageTextInput.current?.maxLength) {
        const maxLength = messageTextInput.current?.maxLength;
        const length = messageTextInput.current?.value?.length;
        setMaxReached(length >= maxLength);
        setCloseToMaxReached((maxLength - length) / maxLength < 0.05);
      }
    }
  }

  function triggerSendMessage() {
    //the last condition is not really necessary, but I think it makes it more explicit
    if (
      userId !== undefined &&
      messageTextInput.current?.value.trimEnd() &&
      messageTextInput.current.value.trimEnd().length > 0
    ) {
      dispatch(
        sendMessage({
          chatId: chatId as string,
          content: messageTextInput.current?.value,
          sentAt: new Date().toISOString(),
          sentBy: userId,
        })
      );
      clearInput();
    }
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
    } else if (ev.key === "Enter" && !ev.shiftKey) {
      ev.preventDefault();
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
      onInputChange={onInputChange}
      onChatboxKeyDown={handleKeyDown}
      onSendClick={handleSendClick}
      maxReached={maxReached}
      closeToMaxReached={closeToMaxReached}
    />
  );
}
