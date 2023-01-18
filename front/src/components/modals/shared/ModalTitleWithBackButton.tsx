import { Button, DialogTitle, Stack } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ModalTitleWithBackButtonProps } from "../ChatDetailsModal/AddParticipantsModalSubsection";

export function ModalTitleWithBackButton({
  title,
  onBackClick,
}: ModalTitleWithBackButtonProps) {
  return (
    <Stack direction="row" alignItems="center">
      <Button
        sx={{ height: "", minWidth: "0", width: "fit-content" }}
        onClick={onBackClick}
      >
        <ArrowBackIcon />
      </Button>
      <DialogTitle component={"h3"} textAlign="right" fontSize="1.8em">
        {title}
      </DialogTitle>
    </Stack>
  );
}
