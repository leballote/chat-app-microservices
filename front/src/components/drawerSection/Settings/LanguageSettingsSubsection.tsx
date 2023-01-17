import {
  Box,
  Typography,
  List,
  Button,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch } from "../../../app/hooks";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useMutation } from "@apollo/client";
import { setMainSubsection } from "../../../app/features/appData/settingsSectionSlice";
import { SET_LANGUAGE } from "../../../app/graphql/mutations";

const LngAbbreviationMapping: { [code: string]: string } = {
  en: "English",
  es: "Español",
  de: "Deutsch",
};

const languageCodeNamePairs = (["de", "en", "es"] ?? [])
  .flatMap((code) =>
    LngAbbreviationMapping[code] != null
      ? [[code, LngAbbreviationMapping[code]]]
      : []
  )
  .sort(([, language1], [, language2]) => {
    return language1 > language2 ? 1 : -1;
  });

export default function LanguageSettingsSubsection() {
  //TODO: change for const
  const dispatch = useAppDispatch();
  const [setLanguageMutationFn] = useMutation(SET_LANGUAGE);
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
          sx={{ margin: ".5em .2em .2em .5em" }}
        >
          <Button
            sx={{ display: "inline-block" }}
            size="small"
            onClick={handleBackClick}
          >
            <ArrowBackIcon />
          </Button>
          {t("settingsSection.languageSubsection.title")}
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
          </ListItem>
        ))}
      </List>
    </>
  );
}
