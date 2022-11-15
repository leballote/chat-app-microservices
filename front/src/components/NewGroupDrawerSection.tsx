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
import AddFriendsDrawerSubsection from "./AddFriendsDrawerSubsection";
import SetTitleAndAvatarDrawerSubsection from "./SetTitleAndAvatarDrawerSubsection";
import { GroupSectionDrawerSubsection as DrawerSubsection } from "../app/features/types";

export default function NewGroupDrawerSection() {
  const { subsection } = useAppSelector((state) => state.newGroupSectionDrawer);

  let component: React.ReactElement;
  if (subsection == DrawerSubsection.ADD_FRIENDS) {
    component = <AddFriendsDrawerSubsection />;
  } else {
    component = <SetTitleAndAvatarDrawerSubsection />;
  }

  return component;
}
