import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
} from "@mui/material";
import { FormEventHandler, MouseEventHandler, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useTranslation } from "react-i18next";
import { closeAddFriendModal } from "../../app/features/appView/contactsDrawerSection/contactsDrawerSectionSlice";
import {
  resetSendFriendRequest,
  sendFriendRequest,
  setSendFriendRequestError,
  setSendFriendRequestLoading,
  setSendFriendRequestValue,
} from "../../app/features/appView/contactsDrawerSection/friendRequestsDrawerSlice";
import { green } from "@mui/material/colors";
import DoneIcon from "@mui/icons-material/Done";
import { triggerNewNotification } from "../../app/features/appView/notifications/notificationsSlice";
import {
  appNotificationManager,
  GenericSuccessAppNotification,
  NotificationType,
} from "../../app/features/appView/types";

export default function AddFriendModal() {
  const {
    sendFriendRequest: {
      value: sendFriendRequestValue,
      loading: sendFriendRequestLoading,
      error: sendFriendRequestError,
    },
  } = useAppSelector((state) => state.friendshipRequestsDrawerSubsection);
  const { addFriendOpen } = useAppSelector(
    (state) => state.contactsDrawerSubsection
  );

  useEffect(() => {
    if (sendFriendRequestValue) {
      dispatch(
        triggerNewNotification(
          appNotificationManager.createNotification({
            notification: {
              notificationType: NotificationType.GENERIC_SUCCESS,
              message: "Friend request sent",
            } as GenericSuccessAppNotification,
          })
        )
      );
      dispatch(setSendFriendRequestValue(null));
      dispatch(closeAddFriendModal());
    }
  }, [sendFriendRequestValue]);

  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const buttonSx = {
    ...(sendFriendRequestValue != null && {
      bgcolor: green[500],
      "&:hover": {
        bgcolor: green[700],
      },
    }),
  };

  function closeModal() {
    dispatch(closeAddFriendModal());
    dispatch(resetSendFriendRequest());
  }

  const handleSend: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();

    if (sendFriendRequestValue) {
      closeModal();
      return;
    }

    const elements = ev.currentTarget.elements as any;
    const {
      email: { value },
    } = elements;
    const userToAddEmail = value as string;

    dispatch(sendFriendRequest({ userToAddEmail }));
  };

  const handleClose: MouseEventHandler<HTMLButtonElement> = () => {
    closeModal();
  };

  return (
    <Dialog open={addFriendOpen} onClose={handleClose}>
      <DialogTitle>{t("app.modals.addFriend.title")}</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSend}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={t("app.modals.addFriend.friendEmail")}
            type="email"
            required
            fullWidth
            name="email"
            variant="standard"
            inputProps={{ maxLength: 320 }}
          />
          <DialogActions>
            <Button
              autoFocus
              onClick={handleClose}
              disabled={sendFriendRequestLoading}
            >
              {t("app.modals.addFriend.cancel")}
            </Button>

            <Box sx={{ m: 1, position: "relative" }}>
              <Button
                autoFocus
                type="submit"
                sx={buttonSx}
                disabled={sendFriendRequestLoading}
                variant="contained"
              >
                {sendFriendRequestValue ? (
                  <DoneIcon />
                ) : (
                  t("app.modals.addFriend.mainAction")
                )}
              </Button>
              {sendFriendRequestLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    color: green[500],
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    marginTop: "-12px",
                    marginLeft: "-12px",
                  }}
                />
              )}
            </Box>
          </DialogActions>
          {sendFriendRequestError ? (
            <Alert severity="error">{sendFriendRequestError.message}</Alert>
          ) : null}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
