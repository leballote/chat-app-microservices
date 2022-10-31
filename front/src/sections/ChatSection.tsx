import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { useState, useEffect, useContext, createContext } from "react";
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
}

function formatDate(dateString: string) {
  const formatedDate = new Date(dateString);
  return formatedDate.toTimeString().split(" ")[0];
  // return `${formatedDate}`;
}

function ChatBody({ messages, height }: Props) {
  const { participants, ...otherChatInfo } = useContext(ChatContext);
  const currentUser = useContext(CurrentUserContext);

  return (
    <Box sx={{ overflow: "auto", height }}>
      <List sx={{ display: "flex", flexFlow: "column" }}>
        {/* //TODO: solve this any */}
        {messages.map((message: any, index: number) => (
          <Box
            sx={{
              bgcolor:
                message.sentBy == currentUser?.id ? "#999999" : "#579977",
              borderRadius: "5px",
              margin: ".1em",
              display: "flex",
              flexBasis: "50%",
              flex: "1",
              alignSelf:
                message.sentBy == currentUser?.id ? "flex-end" : "flex-start",
              maxWidth: "70%",
            }}
            key={message.id}
          >
            <ListItem>
              {index == 0 || messages[index - 1].sentBy != message.sentBy ? (
                <ListItemAvatar>
                  <Avatar src={participants[message.sentBy].avatar} />
                </ListItemAvatar>
              ) : null}

              <ListItemText>
                {index == 0 || messages[index - 1].sentBy != message.sentBy ? (
                  <Typography
                    component="h3"
                    sx={{ fontSize: "1.1em" }}
                    fontWeight="bold"
                  >
                    {participants[message.sentBy].name}
                  </Typography>
                ) : null}
                {index == 0 ||
                messages[index - 1].sentBy != message.sentBy ||
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
    </Box>
  );
}

function ChatsFooter({ height }: { height: string | number }) {
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
      <TextField sx={{ width: "50%" }} />
      <Button variant="outlined" sx={{ aspectRatio: "1 / 1" }}>
        <SendIcon />
      </Button>
    </Box>
  );
}

export default function ChatSection() {
  const { id } = useParams();

  //TODO: figure out why can id be undefined, and how to handle that case
  const chatId = id ?? "1";

  //TODO: maybe change this defaultChat to null and handle on loading
  const [chat, setChat] = useState<Chat>(defaultChat);

  const { messages, participants, ...chatInfo } = chat;

  async function getChatData(id: string) {
    let url: string;
    if (["2", "5", "8"].includes(id)) {
      url = "../data/mockGroupChat.json";
    } else {
      url = "../data/mockOneToOneChat.json";
    }
    const fetched = await fetch(url);
    const { data }: ChatDataResponse = await fetched.json();
    setChat(data);
  }

  useEffect(() => {
    getChatData(chatId);
  }, [id]);

  return (
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
        <ChatBody messages={messages} height={"70vh"} />
        <ChatsFooter height={"20vh"} />
      </ChatContext.Provider>
    </Container>
  );
}
