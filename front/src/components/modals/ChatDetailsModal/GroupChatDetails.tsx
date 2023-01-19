import { useAppSelector } from "../../../app/hooks";
import { Chat } from "../../../types/chat.types";
import { useDispatch } from "react-redux";
import GroupDetailsMainSubsection from "./GroupDetailsMainSubsection";
import AddParticipantsModalSubsection from "./AddParticipantsModalSubsection";
import { setSubsection } from "../../../app/features/appView/chatDetailsModal/chatDetailsModalSlice";
import { ChatDetailsSectionModalSubsection as Subsection } from "../../../app/features/appView/types";

export function GroupChatDetails(props: Omit<Chat, "type">) {
  const { section: subsection } = useAppSelector(
    (state) => state.chatDetailsModalSection
  );
  const dispatch = useDispatch();
  if (subsection == Subsection.ADD_PARTICIPANTS) {
    return (
      <AddParticipantsModalSubsection
        onBack={() => {
          dispatch(setSubsection(Subsection.MAIN));
        }}
      />
    );
  } else {
    return (
      <GroupDetailsMainSubsection
        {...props}
        onAddParticipants={() => {
          dispatch(setSubsection(Subsection.ADD_PARTICIPANTS));
        }}
      />
    );
  }
}
