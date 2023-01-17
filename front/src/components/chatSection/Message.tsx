import {
  Avatar,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { Message as MessageType } from "../../types/chat.types";
import { User } from "../../types/user.types";

type IProps = {
  message: MessageType;
  currentUser: User;
  messages: MessageType[];
  index: number;
};

function formatDate(dateString: string) {
  const formatedDate = new Date(dateString);
  return formatedDate.toTimeString().split(" ")[0];
}

export function Message({ message, messages, currentUser, index }: IProps) {
  return (
    <Box
      sx={{
        bgcolor: message.sentBy.id == currentUser?.id ? "#999999" : "#579977",
        borderRadius: "5px",
        margin: ".1em",
        display: "flex",
        flexBasis: "50%",
        flex: "1",
        alignSelf:
          message.sentBy.id == currentUser?.id ? "flex-end" : "flex-start",
        maxWidth: "70%",
        flexGrow: "0",
      }}
      key={message.id}
    >
      <ListItem>
        {index == messages.length - 1 ||
        messages[index + 1].sentBy.id != message.sentBy.id ? (
          <ListItemAvatar>
            <Avatar src={message.sentBy.avatar} />
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
              {message.sentBy.name}
            </Typography>
          ) : null}
          {index == messages.length - 1 ||
          messages[index + 1].sentBy.id != message.sentBy.id ||
          Math.abs(
            Date.parse(messages[index + 1].sentAt) - Date.parse(message.sentAt)
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
}
