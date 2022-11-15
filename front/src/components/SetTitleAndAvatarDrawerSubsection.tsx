import {
  Box,
  Typography,
  List,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Avatar,
  TextField,
  Stack,
  Grid,
  Container,
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
import {
  addParticipant,
  setAddFriendsSubsection,
} from "../app/features/newGroupSectionDrawerSlice";
import { ParticipantsToAdd } from "./ParticipantsToAdd";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import DoneIcon from "@mui/icons-material/Done";

export default function SetTitleAndAvatarDrawerSubsection() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  function handleBackClick() {
    dispatch(setAddFriendsSubsection());
  }

  function handleNext() {}

  return (
    <Stack>
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
          New Group
        </Typography>
      </Box>

      <Container
        sx={{ display: "flex", justifyContent: "center", margin: "2em 0" }}
      >
        <Avatar
          sx={{
            width: "5em",
            height: "5em",
            "&:hover": {
              color: "ButtonHighlight",
              cursor: "pointer",
            },
          }}
        >
          <PhotoCameraIcon sx={{ fontSize: "2.5em" }} />
        </Avatar>
      </Container>
      {/* //TODO: internationalize this  */}
      <TextField sx={{ margin: "0 1em" }} label="Group Name" />

      <Paper
        sx={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        <Box>
          <Button sx={{ width: "100%" }} onClick={handleNext}>
            <DoneIcon />
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
}
