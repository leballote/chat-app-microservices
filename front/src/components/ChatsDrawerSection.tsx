import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  List,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ChatPreview, { Props as ChatPreviewProps } from "./ChatPreview";
import DrawerSearchBar from "./DrawerSearchBar";
import { ChangeEvent, useState, useEffect } from "react";
import * as React from "react";

interface Chat {
  id: string;
  avatar: string;
  type: string;
  name: string;
  lastMessage: {
    sentBy: string;
    content: string;
    sentAt: string | string;
  };
}

interface ChatsResponse {
  data: {
    chats: Chat[];
  };
}

//TODO: it might be better to pass chats as props and accept onSearch as props; consider it.
export default function ChatDrawerSection() {
  const [chatSearched, setChatSearched] = useState<string>("");
  const [chats, setChats] = useState<ChatPreviewProps[]>([]);

  function handleSearch(ev: ChangeEvent<HTMLInputElement>) {
    setChatSearched(ev.target.value);
  }
  function handleEscapeOnSearch(ev: KeyboardEvent) {
    if (ev.key === "Escape") {
      setChatSearched("");
    }
  }

  async function getChatsData() {
    const preNewData = await fetch("../data/chats.json", {
      headers: {
        Accept: "application/json",
      },
    });
    const newData: ChatsResponse = await preNewData.json();
    let newChats;
    if (chatSearched === "") {
      newChats = newData.data?.chats || [];
    } else {
      newChats = newData.data.chats.filter((val) =>
        val.name.toLowerCase().includes(chatSearched.toLowerCase())
      );
    }
    setChats(newChats);
  }

  useEffect(() => {
    getChatsData();
  }, [chatSearched]);
  return (
    <>
      <Typography
        component="h2"
        fontSize="1.2em"
        fontWeight="light"
        color="MenuText"
        sx={{ margin: "1em .2em .2em .5em" }}
      >
        Chats
      </Typography>
      <DrawerSearchBar
        value={chatSearched}
        onSearch={handleSearch}
        onKeyDown={handleEscapeOnSearch}
      />
      <Box sx={{ overflow: "scroll", marginTop: ".2em" }}>
        <List>
          {chats.map((props: ChatPreviewProps) => (
            <ChatPreview {...props} key={props.id} />
          ))}
        </List>
      </Box>
    </>
  );
}
