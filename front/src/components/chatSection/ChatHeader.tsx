import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import React from "react";
import { WithHeight } from "../../types/utilTypes";
import FormatedAvatar from "../../utils/FormatedAvatar";
import { openDetails } from "../../app/features/appView/chatSectionSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setValue as setCurrentUserProfilePage } from "../../app/features/appView/currentUserProfilePageSlice";
import { Divider, Stack } from "@mui/material";

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
  const { value: chat } = useAppSelector((state) => state.currentChat);
  if (!chat) return null;
  const { ...chatInfo } = chat;

  return chatInfo.type == "INDIVIDUAL" ? (
    <IndividualChatHeader height={height} />
  ) : (
    <GroupChatHeader height={height} />
  );
}

function IndividualChatHeader({ height }: WithHeight) {
  const { value: chat } = useAppSelector((state) => state.currentChat);
  if (!chat) return null;
  const { participants, ...chatInfo } = chat;
  const { value: currentUser } = useAppSelector((state) => state.currentUser);
  const receiver = participants.filter(({ id }) => id != currentUser?.id)[0];
  const dispatch = useAppDispatch();
  const { value: user } = useAppSelector((state) => state.currentUser);

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
  const { value: chat } = useAppSelector((state) => state.currentChat);
  if (!chat) return null;
  const { ...chatInfo } = chat;
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
    <Box height={height} maxWidth="100%">
      <Stack
        direction="row"
        onClick={onOpenDetailsClick}
        height="100%"
        padding=".4em .5em"
        sx={{
          height,
          "&:hover": {
            color: "primary.main",
            bgcolor: "grey.100",
          },
          "&:visited": {
            color: "inherit",
          },
        }}
      >
        <FormatedAvatar {...others} />
        <Box padding="0 1em" maxWidth="92%" sx={{ margin: "0" }}>
          <Typography
            component="h1"
            fontWeight="bold"
            // sx={{ wordWrap: "break-word" }}
            sx={{
              // margin: "0",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflowX: "hidden",
              // maxWidth: "100%",
            }}
          >
            {name.substring(0, 50)}
            {name.length > 50 ? "..." : null}
          </Typography>
          <Typography
            component="h2"
            // sx={{ wordWrap: "break-word" }}
            sx={{
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflowX: "hidden",
              // maxWidth: "100%",
            }}
          >
            {phrase.substring(0, 50)}
            {phrase.length > 50 ? "..." : null}
          </Typography>
        </Box>
      </Stack>
      <Divider />
    </Box>
  );
}
