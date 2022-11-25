import {
  Box,
  Typography,
  List,
  Button,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
import LanguageIcon from "@mui/icons-material/Language";
import { setLanguageSubsection } from "../app/features/settingsSectionSlice";

export default function LanguageSettingsSubsection() {
  //TODO: change for const
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  function handleBackClick() {
    dispatch(setMainDrawerSection());
  }

  function handleLanguageClick() {
    dispatch(setLanguageSubsection());
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
          {t("app.drawer.settings.title")}
        </Typography>
      </Box>
      <List>
        <ListItem>
          <ListItemButton disableRipple onClick={handleLanguageClick}>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary={t("app.drawer.settings.language")} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
