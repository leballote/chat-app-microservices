import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useContext } from "react";
import React from "react";
import { ChatContext, CurrentUserContext } from "../../contexts";
import { WithHeight } from "../../types/utilTypes";
import FormatedAvatar from "../../utils/FormatedAvatar";
import { openDetails } from "../../app/features/appView/chatSectionSlice";
import { useAppDispatch } from "../../app/hooks";
import { setValue as setCurrentUserProfilePage } from "../../app/features/appView/currentUserProfilePageSlice";

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

export default function ChatHeader({ height }: WithHeight) {
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

function BaseChatHeader(props: BaseChatHeaderProps) {
  const { name, phrase, height } = props;
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
