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
import { ChangeEvent, useState, useEffect, ReactElement } from "react";
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
import LanguageSettingsSubsection from "./LanguageSettingsSubsection";
import { SettingsSectionDrawerSubsection as Subsection } from "../app/features/types";
import MainSettingsSubsection from "./MainSettingsSubsection";

export default function SettingsDrawerSection() {
  //TODO: change for const
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { subsection } = useAppSelector((state) => state.settingsSection);

  function handleBackClick() {
    dispatch(setMainDrawerSection());
  }

  function handleLanguageClick() {
    // dispatch();
  }

  let component: ReactElement;

  if (subsection == Subsection.MAIN) {
    component = <MainSettingsSubsection />;
  } else if (subsection == Subsection.LANGUAGE) {
    component = <LanguageSettingsSubsection />;
  } else {
    throw new Error("This code should be unreachable");
  }

  return component;
}
