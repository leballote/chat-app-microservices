import { Alert, Box, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MouseEventHandler } from "react";
import { useDispatch } from "react-redux";
import { removeNotification } from "../../app/features/appView/notifications/notificationsSlice";

type Props = {
  message: string;
  notificationId: number;
};

export function GenericSuccessNotification({ notificationId, message }: Props) {
  const dispatch = useDispatch();

  const handleClose: MouseEventHandler<HTMLButtonElement> = () => {
    dispatch(removeNotification({ notificationId }));
  };

  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar
      open
      message={
        <Box
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            color: "primary",
            alignItems: "center",
            gap: ".4em",
            width: "100%",
          }}
        ></Box>
      }
      action={action}
    >
      <Alert severity="success" sx={{ width: "100%" }} variant={"standard"}>
        {message}
        {action}
      </Alert>
    </Snackbar>
  );
}
