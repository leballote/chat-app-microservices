import {
  Box,
  Typography,
  List,
  Button,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
} from "@mui/material";
import ContactPreview, { Props as ContactPreviewProps } from "./ContactPreview";
import DrawerSearchBar from "./DrawerSearchBar";
import { ChangeEvent, useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getValue as getContactsPreviewsValue,
  setSearchTerm,
} from "../app/features/contactsPreviewsSlice";
import { useTranslation } from "react-i18next";
import { setMainDrawerSection } from "../app/features/sideBarSlice";
import { addParticipant } from "../app/features/newGroupSectionDrawerSlice";
import { ParticipantsToAdd } from "./ParticipantsToAdd";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { setSetTitleAndAvatarSubsection } from "../app/features/newGroupSectionDrawerSlice";

export default function AddFriendsDrawerSubsection() {
  //TODO: change for const
  let {
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
    component = <h1>Loading...</h1>;
    return component;
  } else if (error) {
    component = (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
    return component;
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
      <Box sx={{ overflowY: "auto", marginTop: ".2em" }}>
        <List>
          {contacts.map((contact: ContactPreviewProps) => (
            <ContactPreview
              {...contact}
              key={contact.id}
              onClick={handleAddParticipant}
            />
          ))}
        </List>
      </Box>
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
