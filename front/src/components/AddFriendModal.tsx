import {
  Box,
  Typography,
  List,
  Button,
  Grid,
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
} from "@mui/material";
import ContactPreview, { Props as ContactPreviewProps } from "./ContactPreview";
import DrawerSearchBar from "./DrawerSearchBar";
import {
  ChangeEvent,
  useState,
  useEffect,
  FormEventHandler,
  MouseEventHandler,
} from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getValue as getContactsPreviewsValue,
  setSearchTerm,
} from "../app/features/contactsPreviewsSlice";
import { useTranslation } from "react-i18next";
import { setMainDrawerSection } from "../app/features/sideBarSlice";
import { addParticipant } from "../app/features/newGroupSectionDrawerSlice";
import { ParticipantsToAdd } from "./ParticipantsToAdd";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { setSetTitleAndAvatarSubsection } from "../app/features/newGroupSectionDrawerSlice";
import SearchBar from "./DrawerSearchBar";
import {
  closeAddFriendModal,
  resetSendFriendRequest,
  sendFriendRequest,
  setSendFriendRequestLoading,
} from "../app/features/contactsSectionDrawerSlice";
import { green } from "@mui/material/colors";
import DoneIcon from "@mui/icons-material/Done";

export default function AddFriendModal() {
  const {
    addFriendOpen,
    sendFriendRequest: {
      value: sendFriendRequestValue,
      loading: sendFriendRequestLoading,
      error: sendFriendRequestError,
    },
  } = useAppSelector((state) => state.contactsSectionDrawer);
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

  const handleClose: MouseEventHandler<HTMLButtonElement> = (ev) => {
    closeModal();
  };

  return (
    <Dialog open={addFriendOpen} onClose={handleClose}>
      <DialogTitle>Add friend</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSend}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            //  TODO: internationalize
            label="Friend's email"
            type="email"
            fullWidth
            name="email"
            variant="standard"
          />
          <DialogActions>
            {/* // TODO: internationalize */}
            <Button
              autoFocus
              onClick={handleClose}
              disabled={sendFriendRequestLoading}
            >
              Cancel
            </Button>

            <Box sx={{ m: 1, position: "relative" }}>
              <Button
                autoFocus
                type="submit"
                sx={buttonSx}
                disabled={sendFriendRequestLoading}
                variant="contained"
              >
                {sendFriendRequestValue ? <DoneIcon /> : "Send"}
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
        </Box>
      </DialogContent>
    </Dialog>
  );
}
