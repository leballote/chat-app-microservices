import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { useMutation } from "@apollo/client";
import { setMainSubsection } from "../../../app/features/appData/settingsSectionSlice";
import { SET_LANGUAGE } from "../../../app/graphql/mutations";
import { SectionTitleWithBackButton } from "../../shared/SectionTitleWithBackButton";

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
  const dispatch = useAppDispatch();
  const [setLanguageMutationFn] = useMutation(SET_LANGUAGE);
  const { t } = useTranslation();

  async function handleSelectLanguageClick(
    _ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    languageCode: string
  ) {
    try {
      i18next.changeLanguage(languageCode);
      setLanguageMutationFn({
        variables: {
          input: {
            language: languageCode,
          },
        },
      });
    } catch (e) {
      //TODO: trigger a notification
    }
  }

  async function handleBackClick() {
    dispatch(setMainSubsection());
  }

  return (
    <Box>
      <SectionTitleWithBackButton
        onBackClick={handleBackClick}
        title={t("settingsSection.languageSubsection.title")}
      />
      <List>
        {languageCodeNamePairs.map(([languageCode, languageName]) => (
          <LanguageItem
            key={languageCode}
            languageCode={languageCode}
            languageName={languageName}
            onSelectLanguageClick={handleSelectLanguageClick}
          />
        ))}
      </List>
    </Box>
  );
}
type LanguageItemProps = {
  languageCode: string;
  languageName: string;
  onSelectLanguageClick?: (
    ev: React.MouseEvent<HTMLDivElement, MouseEvent>,
    languageCode: string
  ) => void;
};

function LanguageItem({
  languageCode,
  languageName,
  onSelectLanguageClick,
}: LanguageItemProps) {
  return (
    <ListItem key={languageName}>
      {languageCode}
      <ListItemButton
        disableRipple
        data-language-code={languageCode}
        onClick={(ev) => {
          const languageCode = ev.currentTarget.dataset["languageCode"];
          if (languageCode && typeof onSelectLanguageClick == "function") {
            onSelectLanguageClick(ev, languageCode);
          }
        }}
      >
        <ListItemText primary={languageName} />
      </ListItemButton>
    </ListItem>
  );
}
