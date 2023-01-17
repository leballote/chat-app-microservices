import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

export default function ErrorChat() {
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        fontSize: "4rem",
        margin: "1em",
        fontWeight: "bold",
        color: red[400],
      }}
    >
      {t("app.error.default")}
    </Box>
  );
}
