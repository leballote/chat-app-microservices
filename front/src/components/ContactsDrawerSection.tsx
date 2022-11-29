import {
  Box,
  Typography,
  List,
  Button,
  Grid,
  Tab,
  Tabs,
  Container,
  Badge,
} from "@mui/material";
import ContactPreview, { Props as ContactPreviewProps } from "./ContactPreview";
import DrawerSearchBar from "./DrawerSearchBar";
import { ChangeEvent, useState, useEffect } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import * as React from "react";
import { useQuery, gql, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getValue as getContactsPreviewsValue,
  setSearchTerm,
} from "../app/features/contactsPreviewsSlice";
import { useTranslation } from "react-i18next";
import { pushChat } from "../app/features/chatsPreviewsSlice";
import { useNavigate } from "react-router";
import AddFriendModal from "./AddFriendModal";
import { openAddFriendModal } from "../app/features/contactsSectionDrawerSlice";
import MainContactsSubsection from "./MainContactsSubsection";
import FriendRequestsContactsDrawerSubsection from "./FriendRequestsContactsSubsection";

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

enum Subsection {
  MAIN,
  FRIEND_REQUESTS,
}

export default function ContactsDrawerSection({ onBackClick }: Props) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  //TODO: put this into redux
  const [tabValue, setTabValue] = useState(Subsection.MAIN);

  const handleAddFriendClick: React.MouseEventHandler<
    HTMLButtonElement
  > = () => {
    dispatch(openAddFriendModal());
  };

  const handleChangeTab = (
    event: React.SyntheticEvent,
    newValue: Subsection
  ) => {
    setTabValue(newValue);
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
          //TODO: change for the actual number of friend requests
          // icon={<Box color="ButtonText">4</Box>}
          iconPosition="end"
          value={Subsection.FRIEND_REQUESTS}
        />
      </Tabs>

      <TabPanel value={tabValue} index={Subsection.MAIN}>
        <MainContactsSubsection onBackClick={onBackClick} />
      </TabPanel>
      <TabPanel value={tabValue} index={Subsection.FRIEND_REQUESTS}>
        <FriendRequestsContactsDrawerSubsection />
      </TabPanel>
    </>
  );
}
