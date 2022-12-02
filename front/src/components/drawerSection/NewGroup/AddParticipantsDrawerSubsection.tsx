import { Box, Typography, List, Button, Paper } from "@mui/material";
import ContactPreview, {
  Props as ContactPreviewProps,
} from "../Contacts/ContactPreview";
import DrawerSearchBar from "../DrawerSearchBar";
import { ChangeEvent, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  getValue as getContactsPreviewsValue,
  setSearchTerm,
} from "../../../app/features/appData/contactsPreviewsSlice";
import { useTranslation } from "react-i18next";
import { setMainDrawerSection } from "../../../app/features/appView/sideBarSlice";
import {
  addParticipant,
  resetState,
} from "../../../app/features/appView/newGroupSectionDrawerSlice";
import { ParticipantsToAdd } from "./ParticipantsToAdd";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { setSetTitleAndAvatarSubsection } from "../../../app/features/appView/newGroupSectionDrawerSlice";
import GenericPeopleLoading from "../../feedback/GenericPeopleLoading";
import GenericError from "../../feedback/GenericError";

export default function AddParticipantsDrawerSubsection() {
  const {
    value: contacts,
    loading,
    error,
    searchTerm: contactSearched,
  } = useAppSelector((state) => state.contactsPreviews);
  const participants = useAppSelector(
    (state) => state.newGroupSectionDrawer.participantsToAdd
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(getContactsPreviewsValue(""));
  }, []);

  function handleSearch(ev: ChangeEvent<HTMLInputElement>) {
    dispatch(setSearchTerm(ev.target.value));
  }
  function handleEscapeOnSearch(ev: KeyboardEvent) {
    if (ev.key === "Escape") {
      dispatch(setSearchTerm(""));
    }
  }

  function handleBackClick() {
    dispatch(resetState());
    dispatch(setMainDrawerSection());
  }

  //TODO: solve this any
  function handleAddParticipant(ev: any) {
    dispatch(addParticipant(ev.currentTarget.dataset.contactId));
  }

  function handleNext() {
    dispatch(setSetTitleAndAvatarSubsection());
  }

  let component;
  if (loading) {
    component = <GenericPeopleLoading numberOfPeople={5} />;
  } else if (error) {
    component = <GenericError />;
  } else {
    component = (
      <List>
        {contacts.map((contact: ContactPreviewProps) => (
          <ContactPreview
            {...contact}
            key={contact.id}
            onClick={handleAddParticipant}
          />
        ))}
      </List>
    );
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          component="h2"
          fontSize="1.2em"
          fontWeight="light"
          color="MenuText"
          sx={{ margin: ".5em .2em .2em .5em" }}
        >
          <Button
            sx={{ display: "inline-block" }}
            size="small"
            onClick={handleBackClick}
          >
            <ArrowBackIcon />
          </Button>
          {/* //TODO: internationalize*/}
          Add participants
        </Typography>
      </Box>

      <DrawerSearchBar
        value={contactSearched}
        onSearch={handleSearch}
        onKeyDown={handleEscapeOnSearch}
      />
      <ParticipantsToAdd />
      <Box sx={{ overflowY: "auto", marginTop: ".2em" }}>{component}</Box>
      {participants.length > 0 ? (
        <Paper
          sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <Box>
            <Button sx={{ width: "100%" }} onClick={handleNext}>
              <ArrowForwardIcon />
            </Button>
          </Box>
        </Paper>
      ) : null}
    </>
  );
}
