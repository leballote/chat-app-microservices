import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Link as RouterLink, useParams } from "react-router-dom";
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
import { ChatContext, CurrentUserContext } from "../../contexts";
import { WithHeight } from "../../types/utilTypes";

function getAvatarInitialsFromName(name: string): string {
  if (name == "" || name == null) {
    return "";
  }
  const splitted = name.split(" ") ?? ["N", "A"];
  if (splitted.length == 1) {
    let word = splitted[0];
    if (word.length == 1) {
      return word[0];
    } else {
      return word[0] + word[1];
    }
  } else {
    return splitted[0][0] + splitted[1][0];
  }
}

interface Props {
  height: string | number;
}

export default function ChatHeader({ height }: Props) {
  const { meta, participants } = useContext(ChatContext);

  return meta.type == "individual" ? (
    <IndividualChatHeader height={height} />
  ) : (
    <GroupChatHeader height={height} />
  );
}

function IndividualChatHeader({ height }: WithHeight) {
  const { meta, participants } = useContext(ChatContext);
  const currentUser = useContext(CurrentUserContext);
  //TODO: handle this more elegantly "currentUser?.id, how to be sure that it is already loaded";
  const receiverKey = Object.keys(participants).filter(
    (id) => id != currentUser?.id
  )[0];
  const receiver = participants[receiverKey];

  const props = {
    name: meta.name,
    status: receiver.status,
    phrase: receiver.phrase ?? meta.phrase,
    avatarSrc: receiver.avatar ?? meta.avatar,
    avatarName: getAvatarInitialsFromName(receiver.name ?? meta.name),
    height,
    to: `/profile/user/${meta.id}`,
  };

  return <BaseChatHeader {...props} />;
}

function GroupChatHeader({ height }: WithHeight) {
  const { meta, participants } = useContext(ChatContext);
  const currentUser = useContext(CurrentUserContext);

  const props: BaseChatHeaderProps = {
    name: meta.name,
    phrase: meta.phrase ?? "",
    avatarSrc: meta.avatar,
    avatarName: getAvatarInitialsFromName(meta.name),
    height,
    to: `/profile/group/${meta.id}`,
  };
  return <BaseChatHeader {...props} />;
}

//TODO: check out why do I need to include avatarName? and avatarSrc? two times
type BaseChatHeaderProps = {
  name: string;
  status?: "online" | "offline";
  phrase: string;
  avatarName?: string;
  avatarSrc?: string;
  to: string;
} & ({ avatarName: string } | { avatarSrc: string }) &
  WithHeight;

function BaseChatHeader(props: BaseChatHeaderProps) {
  const { name, status, phrase, avatarSrc, avatarName, height, to } = props;

  return (
    <Box
      sx={{
        backgroundColor: "#CCCCCC",
        height: height,
        padding: 0,
      }}
    >
      <Box
        sx={{
          display: "flex",
          textDecoration: "none",
          width: "fit-content",
          height: "100%",
          "&:hover": {
            backgroundColor: "#AAAAAA",
          },
          "&:visited": {
            color: "inherit",
          },
        }}
        component={RouterLink}
        to={to}
      >
        {avatarSrc ? <Avatar src={avatarSrc} /> : <Avatar>{avatarName}</Avatar>}
        {/* <Link to={to} component={RouterLink} sx={{ textDecoration: "none" }}> */}
        <Container>
          <Typography component="h1" fontWeight="bold">
            {name}
          </Typography>
          {/* </Link> */}
          <Typography component="h2">{phrase}</Typography>
        </Container>
      </Box>
    </Box>
  );
}
