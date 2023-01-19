import { Dialog } from "@mui/material";
import { MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { closeDetails } from "../../../app/features/appView/chatSectionSlice";
import { IndividualChatDetails } from "./IndividualChatDetails";
import { GroupChatDetails } from "./GroupChatDetails";

export default function ChatDetailsModal() {
  const dispatch = useAppDispatch();
  const { detailsOpen } = useAppSelector((state) => state.chatSection);
  const { value: currentChat } = useAppSelector((state) => state.currentChat);

  const handleClose: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(closeDetails());
  };

  let component = null;
  if (currentChat != null) {
    const { type, ...chatDetailsProps } = currentChat;
    let dialogContent = null;
    if (type == "GROUP") {
      dialogContent = <GroupChatDetails {...chatDetailsProps} />;
    } else if (type == "INDIVIDUAL") {
      dialogContent = <IndividualChatDetails {...chatDetailsProps} />;
    }
    component = (
      <Dialog
        data-chat-id={currentChat.id}
        open={detailsOpen}
        onClose={handleClose}
        PaperProps={{ sx: { padding: "1em" } }}
      >
        {dialogContent}
      </Dialog>
    );
  }

  return component;
}
