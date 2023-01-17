import { ListItem, ListItemText, Skeleton } from "@mui/material";
import { MessageBase } from "./MessageBase";

type Props = {
  maxWidth: string | number;
  isOwnedByMe: boolean;
  showSender: boolean;
};

export function MessageSkeleton({ maxWidth, showSender, isOwnedByMe }: Props) {
  return (
    <MessageBase isOwnedByMe={isOwnedByMe} maxWidth={maxWidth}>
      <ListItem>
        <ListItemText>
          {showSender ? <Skeleton sx={{ width: "100%" }} /> : null}
          <Skeleton width="300px" />
        </ListItemText>
      </ListItem>
    </MessageBase>
  );
}
