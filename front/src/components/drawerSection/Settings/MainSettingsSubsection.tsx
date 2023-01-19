import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { useTranslation } from "react-i18next";
import { setMainDrawerSection } from "../../../app/features/appView/sideBarSlice";
import LanguageIcon from "@mui/icons-material/Language";
import { setLanguageSubsection } from "../../../app/features/appData/settingsSectionSlice";
import React from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { SectionTitleWithBackButton } from "../../shared/SectionTitleWithBackButton";
import { TFunction } from "i18next";

const settingSections = [
  {
    id: "language",
    name: (t: TFunction<"translation", undefined>) =>
      t("app.drawer.settings.language"),
    icon: LanguageIcon,
    handleClick: (
      _ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
      dispatch: Dispatch
    ) => {
      dispatch(setLanguageSubsection());
    },
  },
];

export default function LanguageSettingsSubsection() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  function handleBackClick() {
    dispatch(setMainDrawerSection());
  }

  return (
    <Box>
      <SectionTitleWithBackButton
        title={t("app.drawer.settings.title")}
        onBackClick={handleBackClick}
      />
      <List>
        {settingSections.map((settingSection) => (
          <SettingItem
            key={settingSection.id}
            id={settingSection.id}
            icon={settingSection.icon}
            name={settingSection.name(t)}
            onClick={(ev) => {
              settingSection.handleClick(ev, dispatch);
            }}
          />
        ))}
      </List>
    </Box>
  );
}

type SettingItemProps = {
  id: string;
  name: string;
  icon: typeof LanguageIcon;
  onClick?: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    settingId: string
  ) => void;
};

function SettingItem(props: SettingItemProps) {
  const { id, name, onClick } = props;
  return (
    <ListItem>
      <ListItemButton
        disableRipple
        onClick={(ev) => {
          if (typeof onClick == "function") {
            onClick(ev, id);
          }
        }}
      >
        <ListItemIcon>
          <props.icon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItemButton>
    </ListItem>
  );
}
