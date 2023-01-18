import { Stack, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";

export function NewGroupMainForm() {
  const { t } = useTranslation();
  return (
    <Stack gap="1em" padding="0 .5em">
      <TextField
        label={t("app.drawer.newGroup.groupName")}
        inputProps={{ maxLength: 80 }}
        name="name"
        required
      />
      <TextField
        inputProps={{ maxLength: 200 }}
        label={t("app.drawer.newGroup.groupPhrase")}
        name="phrase"
        size="small"
      />
    </Stack>
  );
}
