import { useAppDispatch, useAppSelector } from "../../app/hooks";
import indexArrayByField from "../../utils/indexArrayByField";
import { removeParticipant } from "../../app/features/newGroupSectionDrawerSlice";
import { ParticipantsToAddList } from "../ParticipantsToAddList";
import { MouseEvent } from "react";

type RemoveParticipantFn = (
  ev: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  participantId: string
) => void;

export function ParticipantsToAdd() {
  const contacts = useAppSelector((state) => state.contactsPreviews.value);
  const contactsMap = indexArrayByField(contacts, "id");
  const dispatch = useAppDispatch();
  const participants = useAppSelector(
    (state) => state.newGroupSectionDrawer.participantsToAdd
  ).map((participantId) => contactsMap[participantId]);

  const handleRemoveParticipant: RemoveParticipantFn = (_, participantId) => {
    dispatch(removeParticipant(participantId));
  };

  return (
    <ParticipantsToAddList
      participants={participants}
      onRemoveParticipant={handleRemoveParticipant}
    />
  );
}
