import { Box, List, Button, DialogTitle, DialogContent } from "@mui/material";
import { MouseEventHandler, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useTranslation } from "react-i18next";
import {
  addParticipantToAdd,
  removeParticipantToAdd,
  requestAddParticipants,
} from "../../app/features/currentChatSlice";
import { getValue as getContactsPreviews } from "../../app/features/contactsPreviewsSlice";
import { ParticipantsToAddList } from "../ParticipantsToAddList";
import indexArrayByField from "../../utils/indexArrayByField";
import ParticipantPreviewWithCheckBox from "./ParticipantPreviewWithCheckBox";
import GenericError from "../Feedback/GenericError";

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

  useEffect(() => {
    if (!contactsFirstFetch) {
      dispatch(getContactsPreviews(""));
    }
  }, []);

  //TODO: change this Loading, it should only load the list inside
  let component = null;
  if (loading) {
    component = <h1>Loading...</h1>;
    return component;
  } else if (error) {
    component = <GenericError />;
  } else if (currentChat != null) {
    component = (
      <>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            sx={{ height: "", minWidth: "0", width: "fit-content" }}
            onClick={onBack}
          >
            <ArrowBackIcon />
          </Button>
          <DialogTitle
            component={"h3"}
            textAlign="right"
            sx={{ fontSize: "1.8em", minWidth: "10em" }}
          >
            Add participants to group
          </DialogTitle>
        </Box>

        <DialogContent sx={{ padding: 0 }}>
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
          <Box
            sx={{
              display: "flex",
              flexFlow: "row wrap",
              justifyContent: "center",
            }}
          >
            <Button
              variant="outlined"
              sx={{ width: "50%", justifyItem: "center" }}
              onClick={(ev) => {
                const chatId = chat?.id;
                if (chatId) {
                  dispatch(
                    requestAddParticipants({
                      chatId,
                      participants: participantsToAddIds.map(
                        (participantId) => ({ id: participantId, admin: false })
                      ),
                    })
                  );
                }
              }}
            >
              Add
            </Button>
          </Box>
        </DialogContent>
      </>
    );
  }

  return component;
}
