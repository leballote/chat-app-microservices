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
import i18next from "i18next";
import { useMutation, gql } from "@apollo/client";
import { setMainSubsection } from "../app/features/settingsSectionSlice";

const LngAbbreviationMapping: { [code: string]: string } = {
  en: "English",
  es: "Spanish",
  de: "German",
};

console.log(i18next.languages);

const languageCodeNamePairs = (i18next.languages ?? [])
  .flatMap((code) =>
    LngAbbreviationMapping[code] != null
      ? [[code, LngAbbreviationMapping[code]]]
      : []
  )
  .sort(([code1, language1], [code2, language2]) => {
    return language1 > language2 ? 1 : -1;
  });

const SET_LANGUAGE = gql`
  mutation SetLanguage($input: SetLanguageInput) {
    language
    success
  }
`;

export default function LanguageSettingsSubsection() {
  //TODO: change for const
  const dispatch = useAppDispatch();
  const [setLanguageMutationFn, { loading, data, error }] =
    useMutation(SET_LANGUAGE);
  const { t } = useTranslation();

  async function handleBackClick() {
    dispatch(setMainSubsection());
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
          Language
        </Typography>
      </Box>
      <List>
        {languageCodeNamePairs.map(([languageCode, languageName]) => (
          <ListItem key={languageName}>
            {languageCode}
            <ListItemButton
              disableRipple
              data-language-code={languageCode}
              onClick={(ev) => {
                const languageCode = ev.currentTarget.dataset["languageCode"];
                i18next.changeLanguage(languageCode);

                setLanguageMutationFn({
                  variables: {
                    input: {
                      language: languageCode,
                    },
                  },
                });
              }}
            >
              <ListItemText primary={languageName} />
            </ListItemButton>
            {/* TODO: internationalize */}
          </ListItem>
        ))}
      </List>
    </>
  );
}
