import SendIcon from "@mui/icons-material/Send";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useContext, useEffect, useRef, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import ImageIcon from "@mui/icons-material/Image";
// import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { useDispatch } from "react-redux";
import {
  getValue as getCurrentChatValue,
  loadMessages,
  resetState as resetCurrentChatState,
  sendMessage,
} from "../../app/features/appData/currentChatSlice";
import { resetState as resetChatSectionState } from "../../app/features/appView/chatSectionSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ChatContext, CurrentUserContext } from "../../contexts";
import { Message } from "../../types/chat.types";
import { WithHeight } from "../../types/utilTypes";
import getScrollHeightGap from "../../utils/getScrollHeightGap";
import indexArrayByField from "../../utils/indexArrayByField";
import ChatLoading from "../feedback/ChatLoading";
import ChatDetailsModal from "../modals/ChatDetailsModal";
import ChatHeader from "./ChatHeader";
import { blueGrey } from "@mui/material/colors";

interface Props extends WithHeight {
  messages: Message[];
  chatAreaRef: React.RefObject<HTMLElement>;
}

function formatDate(dateString: string) {
  const formatedDate = new Date(dateString);
  return formatedDate.toTimeString().split(" ")[0];
  // return `${formatedDate}`;
}

function ChatBody({ messages: preMessages, height, chatAreaRef }: Props) {
  const chat = useContext(ChatContext);
  if (!chat) return null;
  let { participants: participantList, ...otherChatInfo } = chat;
  const participants = indexArrayByField(participantList, "id");
  const dispatch = useDispatch();

  const currentUser = useContext(CurrentUserContext);
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

  const handleScroll: React.UIEventHandler<HTMLDivElement> = (ev) => {
    if (chatAreaRef.current && chatAreaRef.current?.scrollTop < 1) {
      dispatch(loadMessages({}));
      chatAreaRef.current?.scrollTo({ top: 1 });
    }
  };

  return (
    <Box
      sx={{
        height,
        overflowY: "auto",
        display: "flex",
        flexFlow: "column",
      }}
      ref={chatAreaRef}
      onScroll={handleScroll}
    >
      <List
        sx={{
          display: "flex",
          flexFlow: "column-reverse",
          flex: "1 1 0px",
        }}
      >
        {messages.map((message, index: number) => {
          return (
            <Box
              sx={{
                bgcolor:
                  message.sentBy.id == currentUser?.id ? "#999999" : "#579977",
                borderRadius: "5px",
                margin: ".1em",
                display: "flex",
                flexBasis: "50%",
                flex: "1",
                alignSelf:
                  message.sentBy.id == currentUser?.id
                    ? "flex-end"
                    : "flex-start",
                maxWidth: "70%",
                flexGrow: "0",
              }}
              key={message.id}
            >
              <ListItem>
                {index == messages.length - 1 ||
                messages[index + 1].sentBy.id != message.sentBy.id ? (
                  <ListItemAvatar>
                    <Avatar src={participants[message.sentBy.id]?.avatar} />
                  </ListItemAvatar>
                ) : null}

                <ListItemText sx={{ overflowWrap: "break-word" }}>
                  {index == messages.length - 1 ||
                  messages[index + 1].sentBy.id != message.sentBy.id ? (
                    <Typography
                      component="h3"
                      sx={{ fontSize: "1.1em" }}
                      fontWeight="bold"
                    >
                      {participants[message.sentBy.id].name}
                    </Typography>
                  ) : null}
                  {index == messages.length - 1 ||
                  messages[index + 1].sentBy.id != message.sentBy.id ||
                  Math.abs(
                    Date.parse(messages[index + 1].sentAt) -
                      Date.parse(message.sentAt)
                  ) > 18000 ? (
                    <Typography
                      component="h3"
                      sx={{ fontSize: "1.1em" }}
                      fontWeight="light"
                    >
                      {formatDate(message.sentAt)}
                    </Typography>
                  ) : null}
                  <Typography variant="body1">{message.content}</Typography>
                </ListItemText>
              </ListItem>
            </Box>
          );
        })}
      </List>
      <Box ref={chatBottomRef}></Box>
    </Box>
  );
}

type ChatFooterProps = {
  loading?: boolean;
} & WithHeight;
function ChatFooter({ height, loading = false }: ChatFooterProps) {
  const dispatch = useAppDispatch();
  const chat = useContext(ChatContext);
  if (!chat) return null;
  const { id: chatId } = chat;
  const user = useContext(CurrentUserContext);
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
      elevation={4}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0em",
        bgcolor: blueGrey[100],
        width: "100%",
        height,
        gap: 2,
      }}
    >
      {/* <Button variant="outlined" sx={{ aspectRatio: "1 / 1" }}>
        <ImageIcon />
      </Button>
      <Button variant="outlined" sx={{ aspectRatio: "1 / 1" }}>
        <EmojiEmotionsIcon />
      </Button> */}
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
    </Paper>
  );
}
type ChatSectionProps = {
  chatFooterLoading?: boolean;
};

export default function ChatSection({
  chatFooterLoading = false,
}: ChatSectionProps) {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const chatAreaRef = useRef<HTMLElement>(null);
  const navigate = useNavigate();

  let chatId = id;
  let {
    error,
    loading,
    value: chat,
  } = useAppSelector((state) => state.currentChat);

  if (chatId == undefined) {
    error = { message: "Chat not defined" };
  }

  const { connected } = useAppSelector((state) => state.wsConnection);

  useEffect(() => {
    if (chatId) {
      dispatch(getCurrentChatValue({ chatId }));
    }
  }, [chatId]);

  useEffect(() => {
    if (error) {
      navigate("/app");
      dispatch(resetCurrentChatState());
      dispatch(resetChatSectionState());
    }
  }, [error, chat, loading]);

  let component;
  if (loading || !connected) {
    component = <ChatLoading />;
  } else if (error) {
    component = <Navigate to={"/chatError"} />;
  } else if (chat != null) {
    const { messages, participants, ...chatInfo } = chat;
    component = (
      <Box
        sx={{
          position: "relative",
          height: "100vh",
          marginTop: "0",
          marginBottom: "0",
          width: "calc(100% - 400px)",
        }}
      >
        <ChatContext.Provider value={{ participants, ...chatInfo }}>
          <ChatHeader height={"10vh"} />
          <ChatBody
            messages={messages}
            height={"70vh"}
            chatAreaRef={chatAreaRef}
          />
          <ChatFooter height={"20vh"} loading={chatFooterLoading} />
        </ChatContext.Provider>
        <ChatDetailsModal />
      </Box>
    );
  } else {
    return null;
  }

  return component;
}
