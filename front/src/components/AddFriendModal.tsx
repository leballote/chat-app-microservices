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
import { closeAddFriendModal } from "../app/features/contactsSectionDrawerSlice";

export default function AddFriendModal() {
  const {
    value: contacts,
    loading,
    error,
    searchTerm: contactSearched,
  } = useAppSelector((state) => state.contactsPreviews);
  const { addFriendOpen } = useAppSelector(
    (state) => state.contactsSectionDrawer
  );
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (!contacts) {
      dispatch(getContactsPreviewsValue(""));
    }
  }, []);

  function handleBackClick() {
    dispatch(setMainDrawerSection());
  }

  const handleSend: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    // dispatch(sendFriendRequest());
  };

  const handleClose: MouseEventHandler<HTMLButtonElement> = (ev) => {
    dispatch(closeAddFriendModal());
  };

  let component;
  if (loading) {
    component = <h1>Loading...</h1>;
    return component;
  } else if (error) {
    component = (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
    return component;
  }

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
            variant="standard"
          />
          <DialogActions>
            {/* // TODO: internationalize */}
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button autoFocus type="submit">
              Send
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
