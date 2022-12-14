import { useAppSelector } from "../../../app/hooks";
import LanguageSettingsSubsection from "./LanguageSettingsSubsection";
import { SettingsSectionDrawerSubsection as Subsection } from "../../../app/features/appView/types";
import MainSettingsSubsection from "./MainSettingsSubsection";

export default function SettingsDrawerSection() {
  const { subsection } = useAppSelector((state) => state.settingsSection);

  let component = null;

  if (subsection == Subsection.MAIN) {
    component = <MainSettingsSubsection />;
  } else if (subsection == Subsection.LANGUAGE) {
    component = <LanguageSettingsSubsection />;
  } else {
    throw new Error("This code should be unreachable");
  }

  return component;
}
