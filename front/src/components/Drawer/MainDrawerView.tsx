import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfilePreview from "./ProfilePreview";
import ChatsDrawerSection from "./ChatsDrawerSection";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useContext, useEffect, useRef, useState } from "react";
import { CurrentUserContext } from "../../contexts";
import { useAppSelector } from "../../app/hooks";
import { useDispatch } from "react-redux";
import {
  resetState as resetMainDrawerState,
  turnOffMoreMenu,
  turnOnMoreMenu,
} from "../../app/features/mainSectionDrawerSlice";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router";
import { getValue as getCurrentUserValue } from "../../app/features/currentUserSlice";
import { useTranslation } from "react-i18next";
import {
  setNewGroupDrawerSection,
  setSettingsDrawerSection,
} from "../../app/features/sideBarSlice";

interface Props {
  onContactsClick: (ev: React.MouseEvent<HTMLElement>) => void;
  onMoreClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

export default function MainDrawerView(props: Props) {
  const userInfo = useContext(CurrentUserContext);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const anchorRef = useRef<HTMLButtonElement | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const LOGOUT = gql`
    mutation {
      logout {
        success
      }
    }
  `;
  const [logoutMutationFn, { loading: loadingLogOut, error: errorLogOut }] =
    useMutation(LOGOUT);
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
    await logoutMutationFn();
    dispatch(resetMainDrawerState());
    dispatch(getCurrentUserValue());
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
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
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
