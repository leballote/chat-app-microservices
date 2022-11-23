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
import {
  closeAddFriendModal,
  sendFriendRequest,
} from "../app/features/contactsSectionDrawerSlice";

export default function ChatDetailsModal() {
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

  const handleSend: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    console.log();
    const elements = ev.currentTarget.elements as any;
    const {
      email: { value },
    } = elements;
    const userToAddEmail = value as string;

    dispatch(sendFriendRequest({ userToAddEmail }));
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
            name="email"
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
