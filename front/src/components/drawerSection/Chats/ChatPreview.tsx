import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import * as React from "react";

import { Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export interface Props {
  id: string;
  avatar?: string;
  type: string;
  name: string;
  to?: string;
  lastMessage?: {
    sentBy: {
      id: string;
    };
    content: string;
    sentAt: string | Date;
  };
}

export default function ChatPreview({ id, avatar, name, lastMessage }: Props) {
  const { t } = useTranslation();
  let previewSection: React.ReactElement;
  const { content } = lastMessage || {
    content: "",
    sentAt: "",
  };

  let { sentAt } = lastMessage || { sentAt: "" };
  if (typeof sentAt === "string") sentAt = new Date(sentAt);
  if (lastMessage) {
    previewSection = (
      <Typography component="p" fontSize={".8em"} color="text.secondary">
        {content.substring(0, 30)}
        {content.length > 30 ? "..." : null}
      </Typography>
    );
  } else {
    previewSection = (
      <Typography
        component="p"
        fontSize={".8em"}
        color="text.secondary"
        fontStyle={"italic"}
      >
        {t("app.drawer.chats.newChat")}
      </Typography>
    );
  }

  return (
    <ListItem
      button
      component={RouterLink}
      to={`chat/${id}`}
      sx={{ overflowWrap: "break-word" }}
    >
      <ListItemAvatar>
        <Avatar
          alt={`avatar of ${name}`}
          src={avatar}
          sx={{
            width: 60,
            height: 60,
          }}
        />
      </ListItemAvatar>
      <ListItemText
        sx={{
          marginLeft: ".6em",
        }}
      >
        <Typography
          component="h3"
          fontSize={"1.1em"}
          fontWeight="bold"
          color="textPrimary"
        >
          {name.substring(0, 20)}
          {name.length > 20 ? "..." : null}
        </Typography>
        {previewSection}
      </ListItemText>
    </ListItem>
  );
}
