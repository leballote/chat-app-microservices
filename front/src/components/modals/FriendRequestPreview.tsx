import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

export interface Props {
  user: {
    id: string;
    name: string;
    username: string;
    phrase: string;
    avatar: string;
  };
  accepting?: boolean;
  rejecting?: boolean;
  onAccept: any;
  onReject: any;
  sentAt: string;
}

export default function FriendRequestPreview({
  user: { name, username, avatar, id },
  onAccept,
  onReject,
}: Props) {
  return (
    <ListItem
      key={id}
      data-user-id={`${id}`}
      className={"friend-request-preview"}
    >
      <ListItemAvatar>
        <Avatar
          alt={`${avatar} of ${name}`}
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
          fontSize={"1.1rem"}
          fontWeight="bold"
          color="text.primary"
          sx={{
            overflowX: "hidden",
            "&:hover": {
              overflowX: "auto",
            },
          }}
        >
          {name}
        </Typography>
        <Typography component="p" fontSize={".9rem"} color="text.secondary">
          {username}
        </Typography>
        <Button onClick={onAccept} sx={{ color: "success.main" }}>
          <DoneIcon />
        </Button>
        <Button onClick={onReject} sx={{ color: "error.main" }}>
          <CloseIcon />
        </Button>
      </ListItemText>
    </ListItem>
  );
}
