import { List, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loadMessages } from "../../../app/features/appData/currentChatSlice";
import { useAppSelector } from "../../../app/hooks";
import getScrollHeightGap from "../../../utils/getScrollHeightGap";
import { Props } from "../ChatSection";
import { Message } from "../Message/Message";

export function ChatBody({
  messages: preMessages,
  height,
  chatAreaRef,
}: Props) {
  const { value: chat } = useAppSelector((state) => state.currentChat);
  if (!chat) return null;
  const dispatch = useDispatch();

  const { value: currentUser } = useAppSelector((state) => state.currentUser);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const [scrollInfo, setScrollInfo] = useState<{
    top: number | undefined | null;
    bottom: number | undefined | null;
  }>({
    top: 0,
    bottom: 0,
  });
  const [messages, setMessages] = useState([] as typeof preMessages);

  useEffect(() => {
    setScrollInfo({
      top: chatAreaRef.current?.scrollTop,
      bottom: chatAreaRef?.current && getScrollHeightGap(chatAreaRef.current),
    });
    setMessages(preMessages);
  }, [preMessages]);

  useEffect(() => {
    if (scrollInfo.bottom == null) {
      return;
    }
    if (scrollInfo.bottom < 2) {
      chatBottomRef.current?.scrollIntoView();
    }
  }, [scrollInfo]);

  const handleScroll: React.UIEventHandler<HTMLDivElement> = () => {
    if (chatAreaRef.current && chatAreaRef.current?.scrollTop < 1) {
      dispatch(loadMessages({}));
      chatAreaRef.current?.scrollTo({ top: 1 });
    }
  };

  return (
    <Stack
      sx={{
        height,
        overflowY: "auto",
      }}
      ref={chatAreaRef}
      onScroll={handleScroll}
    >
      <Stack
        direction="column-reverse"
        flex="1 1 0px"
        component={List}
        gap=".1em"
      >
        {messages.map((message, index: number) => {
          const isFirstMessageInBatch =
            index == messages.length - 1 ||
            messages[index + 1].sentBy.id != message.sentBy.id;
          const hasPassedEnoughTime =
            index == messages.length - 1 ||
            Math.abs(
              Date.parse(messages[index + 1].sentAt) -
                Date.parse(message.sentAt)
            ) > 18000;

          return (
            <Message
              key={message.id}
              message={message}
              showUsername={isFirstMessageInBatch}
              showDatetime={isFirstMessageInBatch || hasPassedEnoughTime}
              isOwnedByMe={message.sentBy.id == currentUser?.id}
            />
          );
        })}
      </Stack>
      <Box ref={chatBottomRef}></Box>
    </Stack>
  );
}
