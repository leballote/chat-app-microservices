import Drawer from "@mui/material/Drawer";
import {
  setContactsDrawerSection,
  setMainDrawerSection,
} from "../../app/features/appView/sideBarSlice";
import { SectionName as DrawerSection } from "../../app/features/appView/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import ContactsDrawerSection from "./Contacts/ContactsDrawerSection";
import MainDrawerView from "./MainDrawerView";
import NewGroupDrawerSection from "./NewGroup/NewGroupDrawerSection";
import SettingsDrawerSection from "./Settings/SettingsDrawerSection";

const drawerWidth = 400;

export default function ResponsiveDrawer() {
  const { name: currentDrawerSection } = useAppSelector(
    (state) => state.sideBar
  );
  const dispatch = useAppDispatch();

  let section;
  if (currentDrawerSection == DrawerSection.MAIN) {
    section = (
      <MainDrawerView
        //TODO: onMoreClick doesn't work anymore, remove it:
        onMoreClick={() => {}}
        onContactsClick={() => dispatch(setContactsDrawerSection())}
      />
    );
  } else if (currentDrawerSection == DrawerSection.CONTACTS) {
    section = (
      <ContactsDrawerSection
        //TODO handle on add contact click
        onAddContactClick={() => {}}
        onBackClick={() => dispatch(setMainDrawerSection())}
      />
    );
  } else if (currentDrawerSection == DrawerSection.NEW_GROUP) {
    section = <NewGroupDrawerSection />;
  } else if (currentDrawerSection == DrawerSection.SETTINGS) {
    section = <SettingsDrawerSection />;
  } else {
    section = null;
    throw Error("This should be unreachable");
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          position: "relative",
          height: "100vh",
        },
      }}
      open
    >
      {section}
    </Drawer>
  );
}
