import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";

export default function GenericError() {
  const { t } = useTranslation();
  return (
    <Box sx={{ margin: "1em", color: "error.main" }}>
      <Typography>{t("app.error.default")}</Typography>
    </Box>
  );
}
