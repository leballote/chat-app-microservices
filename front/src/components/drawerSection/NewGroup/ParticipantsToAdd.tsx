import { MouseEvent } from "react";
import { removeParticipant } from "../../../app/features/appView/newGroupSectionDrawerSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import indexArrayByField from "../../../utils/indexArrayByField";
import { ParticipantsToAddList } from "../../shared/ParticipantsToAddList";

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
