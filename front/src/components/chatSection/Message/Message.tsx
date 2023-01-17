import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Message as MessageType } from "../../../types/chat.types";
import { MessageBase } from "./MessageBase";

type IProps = {
  message: MessageType;
  isOwnedByMe: boolean;
  showUsername: boolean;
  showDatetime: boolean;
};

function formatDate(dateString: string) {
  const formatedDate = new Date(dateString);
  return formatedDate.toTimeString().split(" ")[0];
}

export function Message({
  message,
  isOwnedByMe,
  showUsername,
  showDatetime,
}: IProps) {
  return (
    <MessageBase isOwnedByMe={isOwnedByMe} maxWidth="55%">
      <ListItem>
        {showUsername ? (
          <ListItemAvatar>
            <Avatar src={message.sentBy.avatar} />
          </ListItemAvatar>
        ) : null}

        <ListItemText sx={{ overflowWrap: "break-word" }}>
          {showUsername ? (
            <Typography
              component="h3"
              sx={{ fontSize: "1.1em" }}
              fontWeight="bold"
            >
              {message.sentBy.name}
            </Typography>
          ) : null}
          {showDatetime ? (
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
    </MessageBase>
  );
}
