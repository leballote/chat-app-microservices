import { Box, List, Button, DialogContent, Stack } from "@mui/material";
import { MouseEventHandler, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useTranslation } from "react-i18next";
import {
  addParticipantToAdd,
  removeParticipantToAdd,
  requestAddParticipants,
} from "../../../app/features/appData/currentChatSlice";
import { getValue as getContactsPreviews } from "../../../app/features/appData/contactsPreviewsSlice";
import { ParticipantsToAddList } from "../../shared/ParticipantsToAddList";
import indexArrayByField from "../../../utils/indexArrayByField";
import ParticipantPreviewWithCheckBox from "./ParticipantPreviewWithCheckBox";
import GenericError from "../../feedback/GenericError";
import { ModalTitleWithBackButton } from "../shared/ModalTitleWithBackButton";
import GenericPeopleLoading from "../../feedback/GenericPeopleLoading";

type AddParticipantToAddFn = (
  ev: React.MouseEvent<HTMLLIElement, globalThis.MouseEvent>,
  participantId: string
) => void;

type RemoveParticipantToAddFn = (
  ev: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  participantId: string
) => void;

type Props = {
  onBack?: MouseEventHandler<HTMLButtonElement>;
};

export default function AddParticipantsModalSubsection({ onBack }: Props) {
  const dispatch = useAppDispatch();
  const { value: chat } = useAppSelector((state) => state.currentChat);
  const {
    value: contacts_,
    loading: contactsLoading,
    error: contactsError,
    firstFetch: contactsFirstFetch,
  } = useAppSelector((state) => state.contactsPreviews);
  const { t } = useTranslation();

  const participantsIds = chat?.participants.map(
    (participant) => participant.id
  );
  const contacts = contacts_.filter(
    (contact) => !participantsIds?.includes(contact.id)
  );

  const contactsMap = indexArrayByField(contacts, "id");

  const participantsToAddIds = useAppSelector(
    (state) => state.currentChat.participantsToAddIds
  );

  const participantsToAdd = participantsToAddIds.map(
    (participantId) => contactsMap[participantId]
  );

  const {
    loading,
    error,
    value: currentChat,
  } = useAppSelector((state) => state.currentChat);

  const handleAddParticipantToAdd: AddParticipantToAddFn = (
    ev,
    participantToAddId
  ) => {
    dispatch(addParticipantToAdd(participantToAddId));
  };

  const handleRemoveParticipantToAdd: RemoveParticipantToAddFn = (
    _,
    participantToAddId
  ) => {
    dispatch(removeParticipantToAdd(participantToAddId));
  };

  const handleAddParticipant = () => {
    const chatId = chat?.id;
    if (chatId) {
      dispatch(
        requestAddParticipants({
          chatId,
          participants: participantsToAddIds.map((participantId) => ({
            id: participantId,
            admin: false,
          })),
        })
      );
    }
  };

  useEffect(() => {
    if (!contactsFirstFetch) {
      dispatch(getContactsPreviews(""));
    }
  }, []);

  //TODO: change this Loading, it should only load the list inside
  let component = null;
  if (contactsLoading || loading) {
    component = <GenericPeopleLoading numberOfPeople={3} />;
  } else if (contactsError || error) {
    component = <GenericError />;
  } else if (currentChat != null) {
    component = (
      <>
        <ParticipantsToAddList
          participants={participantsToAdd}
          onRemoveParticipant={handleRemoveParticipantToAdd}
        />
        <List sx={{ maxHeight: "70vh" }}>
          {contacts.map((contact) => (
            <ParticipantPreviewWithCheckBox
              {...contact}
              onAddParticipantToAdd={handleAddParticipantToAdd}
              key={contact.id}
            />
          ))}
        </List>
      </>
    );
  }

  return (
    <Box>
      <ModalTitleWithBackButton
        onBackClick={onBack}
        title={t("app.modals.chatDetails.addParticipantsSubsection.title")}
      />
      <DialogContent sx={{ padding: 0 }}>
        {component}
        <Stack direction="row" justifyContent="center">
          <Button
            variant="outlined"
            fullWidth
            onClick={handleAddParticipant}
            disabled={loading || contactsLoading}
          >
            {t("app.modals.chatDetails.addParticipantsSubsection.mainAction")}
          </Button>
        </Stack>
      </DialogContent>
    </Box>
  );
}
export type ModalTitleWithBackButtonProps = {
  title: string;
  onBackClick?: MouseEventHandler<HTMLButtonElement>;
};
