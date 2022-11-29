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
import React from "react";
import { ChatContext, CurrentUserContext } from "../../contexts";
import { WithHeight } from "../../types/utilTypes";
import FormatedAvatar from "../../utils/FormatedAvatar";
import { openDetails } from "../../app/features/chatSectionSlice";
import { useAppDispatch } from "../../app/hooks";
import { setValue as setCurrentUserProfilePage } from "../../app/features/currentUserProfilePageSlice";

interface Props {
  height: string | number;
}

export default function ChatHeader({ height }: Props) {
  const chat = useContext(ChatContext);
  if (!chat) return null;
  const { participants, ...chatInfo } = chat;

  return chatInfo.type == "INDIVIDUAL" ? (
    <IndividualChatHeader height={height} />
  ) : (
    <GroupChatHeader height={height} />
  );
}

function IndividualChatHeader({ height }: WithHeight) {
  const chat = useContext(ChatContext);
  if (!chat) return null;
  const { participants, ...chatInfo } = chat;
  const currentUser = useContext(CurrentUserContext);
  //TODO: handle this more elegantly "currentUser?.id, how to be sure that it is already loaded";
  const receiver = participants.filter(({ id }) => id != currentUser?.id)[0];
  const dispatch = useAppDispatch();
  const user = useContext(CurrentUserContext);

  const handleOpenDetailsClick: React.MouseEventHandler<
    HTMLDivElement
  > = () => {
    dispatch(openDetails());
    dispatch(
      setCurrentUserProfilePage(
        participants.filter((participant) => user?.id != participant.id)[0]
      )
    );
  };

  const props = {
    name: chatInfo.name,
    status: receiver.status,
    phrase: chatInfo.phrase,
    avatarSrc: chatInfo.avatar,
    avatarName: chatInfo.name,
    height,
    to: `/profile/user/${chatInfo.id}`,
    onOpenDetailsClick: handleOpenDetailsClick,
  };

  return <BaseChatHeader {...props} />;
}

function GroupChatHeader({ height }: WithHeight) {
  const chat = useContext(ChatContext);
  if (!chat) return null;
  const { participants, ...chatInfo } = chat;
  const dispatch = useAppDispatch();

  const handleOpenDetailsClick: React.MouseEventHandler<
    HTMLDivElement
  > = () => {
    dispatch(openDetails());
  };

  const props: BaseChatHeaderProps = {
    name: chatInfo.name,
    phrase: chatInfo.phrase ?? "",
    avatarSrc: chatInfo.avatar,
    avatarName: chatInfo.name,
    height,
    to: `/profile/group/${chatInfo.id}`,
    onOpenDetailsClick: handleOpenDetailsClick,
  };
  return <BaseChatHeader {...props} />;
}

//TODO: check out why do I need to include avatarName? and avatarSrc? two times
type BaseChatHeaderProps = {
  name: string;
  status?: "ONLINE" | "OFFLINE";
  phrase: string;
  avatarName?: string;
  avatarSrc?: string;
  to: string;
  onOpenDetailsClick?: React.MouseEventHandler<HTMLDivElement>;
} & ({ avatarName: string } | { avatarSrc: string }) &
  WithHeight;

function BaseChatHeader(props: BaseChatHeaderProps) {
  const { name, status, phrase, height, to } = props;
  const { onOpenDetailsClick, ...others } = props;

  return (
    <Box
      sx={{
        backgroundColor: "#CCCCCC",
        height: height,
        padding: 0,
      }}
    >
      <Box
        onClick={onOpenDetailsClick}
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
      >
        <FormatedAvatar {...others} />
        <Container>
          <Typography component="h1" fontWeight="bold">
            {name}
          </Typography>
          <Typography component="h2">{phrase}</Typography>
        </Container>
      </Box>
    </Box>
  );
}
