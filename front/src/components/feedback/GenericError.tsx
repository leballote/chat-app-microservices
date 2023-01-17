import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

export default function GenericError() {
  const { t } = useTranslation();
  return (
    <Box sx={{ margin: "1em", color: red[400] }}>
      <Typography>{t("app.error.default")}</Typography>
    </Box>
  );
}
