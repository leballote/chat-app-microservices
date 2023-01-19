import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfilePreview from "./ProfilePreview";
import ChatsDrawerSection from "./Chats/ChatsDrawerSection";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import {
  resetState as resetMainDrawerState,
  turnOffMoreMenu,
  turnOnMoreMenu,
} from "../../app/features/appView/mainSectionDrawerSlice";
import { useTranslation } from "react-i18next";
import {
  setNewGroupDrawerSection,
  setSettingsDrawerSection,
} from "../../app/features/appView/sideBarSlice";
import { triggerLogout } from "../../app/features/appData/authSlice";
import { Stack } from "@mui/material";

interface Props {
  onContactsClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

export default function MainDrawerView(props: Props) {
  const { value: userInfo } = useAppSelector((state) => state.currentUser);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { moreDropdownActive: moreMenuOpen } = useAppSelector(
    (state) => state.mainSectionDrawer
  );

  useEffect(() => {
    setAnchorEl(anchorRef.current);
  }, [anchorEl]);

  function handleClose() {
    dispatch(turnOffMoreMenu());
  }

  function handleOpen() {
    dispatch(turnOnMoreMenu());
  }

  async function handleLogOut() {
    dispatch(triggerLogout());
  }

  function handleNewGroup() {
    dispatch(resetMainDrawerState());
    dispatch(setNewGroupDrawerSection());
  }

  function handleSettings() {
    dispatch(resetMainDrawerState());
    dispatch(setSettingsDrawerSection());
  }

  return userInfo ? (
    <>
      <ProfilePreview {...userInfo} />
      <Divider />
      <Toolbar component={Stack} justifyContent="space-around" direction="row">
        <Button startIcon={<ContactsIcon />} onClick={props.onContactsClick}>
          {t("user.friends")}
        </Button>
        <Button onClick={handleOpen} ref={anchorRef}>
          <MoreVertIcon />
        </Button>
      </Toolbar>
      <Divider />
      <ChatsDrawerSection />
      {moreMenuOpen && anchorEl != null ? (
        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          anchorEl={anchorEl}
          open={true}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleNewGroup}>
            {t("app.drawer.main.newGroup")}
          </MenuItem>
          <MenuItem onClick={handleSettings}>
            {t("app.drawer.main.settings")}
          </MenuItem>
          <MenuItem onClick={handleLogOut}>
            {t("app.drawer.main.logout")}
          </MenuItem>
        </Menu>
      ) : null}
    </>
  ) : null;
}
