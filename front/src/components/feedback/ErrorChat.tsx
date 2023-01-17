import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";

export default function ErrorChat() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        fontSize: "4rem",
        margin: "1em",
        fontWeight: "bold",
        color: "error.main",
      }}
    >
      {t("app.error.default")}
    </Box>
  );
}
