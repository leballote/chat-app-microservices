import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext, createContext, useRef } from "react";
import {
  List,
  ListItem,
  Avatar,
  ListItemAvatar,
  ListItemText,
  Grid,
  CssBaseline,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ImageIcon from "@mui/icons-material/Image";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import {
  Chat,
  ChatContextType,
  ChatDataResponse,
  ChatUser,
  Message,
} from "../types/ChatSectionTypes";
import { ChatContext, CurrentUserContext } from "../contexts";
import ChatHeader from "../components/ChatSectionComponents/ChatHeader";
import { WithHeight } from "../types/utilTypes";
import indexArrayByField from "../utils/indexArrayByField";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { User } from "../types/AppTypes";
import {
  getValue as getCurrentChatValue,
  sendMessage,
} from "../app/features/currentChatSlice";
import { setOnBottom } from "../app/features/chatSectionSlice";
import getScrollHeightGap from "../utils/getScrollHeightGap";

const defaultChat: Chat = {
  id: "",
  name: "",
  type: "INDIVIDUAL",
  phrase: "",
  participants: [
    {
      id: "",
      status: "ONLINE",
      name: "",
      phrase: "",
      admin: false,
      avatar: "",
    },
  ],
  messages: [],
};

interface Props extends WithHeight {
  messages: Message[];
  chatAreaRef: React.RefObject<HTMLElement>;
}

function formatDate(dateString: string) {
  const formatedDate = new Date(dateString);
  return formatedDate.toTimeString().split(" ")[0];
  // return `${formatedDate}`;
}

function ChatBody({ messages, height, chatAreaRef }: Props) {
  let { participants: participantList, ...otherChatInfo } =
    useContext(ChatContext);
  const participants = indexArrayByField(participantList, "id");

  const currentUser = useContext(CurrentUserContext);
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const { onBottom } = useAppSelector((state) => state.chatSection);
  console.log(onBottom);

  useEffect(() => {
    // const element = chatAreaRef.current;
    // if (element == null) return;
    if (onBottom) {
      chatBottomRef.current?.scrollIntoView();
    }
  }, [messages]);

  return (
    <Box sx={{ height, overflowY: "auto" }} ref={chatAreaRef}>
      <List sx={{ display: "flex", flexFlow: "column" }}>
        {messages.map((message, index: number) => (
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
            }}
            key={message.id}
          >
            <ListItem>
              {index == 0 ||
              messages[index - 1].sentBy.id != message.sentBy.id ? (
                <ListItemAvatar>
                  <Avatar src={participants[message.sentBy.id].avatar} />
                </ListItemAvatar>
              ) : null}

              <ListItemText sx={{ overflowWrap: "break-word" }}>
                {index == 0 ||
                messages[index - 1].sentBy.id != message.sentBy.id ? (
                  <Typography
                    component="h3"
                    sx={{ fontSize: "1.1em" }}
                    fontWeight="bold"
                  >
                    {participants[message.sentBy.id].name}
                  </Typography>
                ) : null}
                {index == 0 ||
                messages[index - 1].sentBy.id != message.sentBy.id ||
                Math.abs(
                  Date.parse(messages[index - 1].sentAt) -
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
        ))}
      </List>
      <Box ref={chatBottomRef}></Box>
    </Box>
  );
}

//TODO: solve this any
function ChatsFooter({
  height,
  onSend,
}: {
  height: string | number;
  onSend: any;
}) {
  const dispatch = useAppDispatch();
  const { id: chatId } = useContext(ChatContext);
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
      onSend();
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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0em",
        bgcolor: "#CCCCCC",
        width: "100%",
        height,
      }}
      gap={2}
    >
      <Button variant="outlined" sx={{ aspectRatio: "1 / 1" }}>
        <ImageIcon />
      </Button>
      <Button variant="outlined" sx={{ aspectRatio: "1 / 1" }}>
        <EmojiEmotionsIcon />
      </Button>
      <TextField
        sx={{ width: "50%" }}
        // ref={messageTextInput}
        InputProps={{ onKeyDown: handleKeyDown }}
        inputRef={messageTextInput}
      />
      <Button
        variant="outlined"
        sx={{ aspectRatio: "1 / 1" }}
        onClick={handleSendClick}
      >
        <SendIcon />
      </Button>
    </Box>
  );
}

export default function ChatSection() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const chatAreaRef = useRef<HTMLElement>(null);

  let chatId = id;
  let nonExistingChat = false;
  let {
    error,
    loading,
    value: chat,
  } = useAppSelector((state) => state.currentChat);

  if (chatId == undefined) {
    error = new Error("Chat not defined");
  }

  //TODO: try to handle better the fact that chat could be null

  useEffect(() => {
    if (chatId) {
      dispatch(getCurrentChatValue(chatId));
    }
  }, [id]);

  let component;
  if (loading) {
    component = <h1>Loading...</h1>;
  } else if (error) {
    component = (
      <div>
        <h1>Loading...</h1>
        <p>Error: {error.message}</p>
      </div>
    );
  } else if (chat != null) {
    const { messages, participants, ...chatInfo } = chat;
    component = (
      <Container
        sx={{
          position: "relative",
          height: "100vh",
          marginTop: "0",
          marginBottom: "0",
        }}
      >
        <ChatContext.Provider value={{ participants, ...chatInfo }}>
          <ChatHeader height={"10vh"} />
          <ChatBody
            messages={messages}
            height={"70vh"}
            chatAreaRef={chatAreaRef}
          />
          <ChatsFooter
            height={"20vh"}
            onSend={() => {
              const element = chatAreaRef.current;
              if (element == null) return;
              const scrollHeightGap = getScrollHeightGap(element);
              dispatch(setOnBottom(scrollHeightGap < 5));
            }}
          />
        </ChatContext.Provider>
      </Container>
    );
  } else {
    return <h1>This should not be possible</h1>;
  }

  return component;
}
