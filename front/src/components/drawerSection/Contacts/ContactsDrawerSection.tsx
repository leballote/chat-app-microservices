import { Box, Typography, Button, Tab, Tabs } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useTranslation } from "react-i18next";
import AddFriendModal from "../../modals/AddFriendModal";
import {
  openAddFriendModal,
  setSubsection,
} from "../../../app/features/appView/contactsDrawerSection/contactsDrawerSectionSlice";
import MainContactsSubsection from "./MainContactsSubsection";
import FriendRequestsContactsDrawerSubsection from "./FriendRequestsContactsSubsection";
import { ContactsSectionDrawerSubsection as Subsection } from "../../../app/features/appView/types";

interface TabPanelProps {
  children?: React.ReactNode;
  index: Subsection;
  value: Subsection;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box sx={{ overflowY: "auto", marginTop: ".2em" }}>
        {value === index && children}
      </Box>
    </div>
  );
}

interface Props {
  onBackClick: (ev: React.MouseEvent<HTMLElement>) => void;
  onAddContactClick?: (ev: React.MouseEvent<HTMLElement>) => void;
}

export default function ContactsDrawerSection({ onBackClick }: Props) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { section: tabValue } = useAppSelector(
    (state) => state.contactsDrawerSubsection
  );

  const handleAddFriendClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(openAddFriendModal());
  };

  const handleChangeTab = (
    _event: React.SyntheticEvent,
    newValue: Subsection
  ) => {
    dispatch(setSubsection(newValue));
  };

  return (
    <>
      <AddFriendModal />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          component="h2"
          fontSize="1.2em"
          fontWeight="light"
          color="MenuText"
          sx={{ margin: ".5em .2em .2em .5em" }}
        >
          <Button
            sx={{ display: "inline-block" }}
            size="small"
            onClick={onBackClick}
          >
            <ArrowBackIcon />
          </Button>
          {t("user.friends")}
        </Typography>

        <Button onClick={handleAddFriendClick}>
          <PersonAddIcon fontSize="large" />
        </Button>
      </Box>

      <Tabs onChange={handleChangeTab} value={tabValue}>
        <Tab label={t("app.drawer.contacts.friends")} value={Subsection.MAIN} />
        <Tab
          label={t("app.drawer.contacts.friendRequests")}
          iconPosition="end"
          value={Subsection.FRIEND_REQUESTS}
        />
      </Tabs>

      <TabPanel value={tabValue} index={Subsection.MAIN}>
        <MainContactsSubsection />
      </TabPanel>
      <TabPanel value={tabValue} index={Subsection.FRIEND_REQUESTS}>
        <FriendRequestsContactsDrawerSubsection />
      </TabPanel>
    </>
  );
}
