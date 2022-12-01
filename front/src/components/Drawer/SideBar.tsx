import Drawer from "@mui/material/Drawer";
import MainDrawerView from "./MainDrawerView";
import ContactsDrawerSection from "./ContactsDrawerSection";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  setContactsDrawerSection,
  setMainDrawerSection,
} from "../../app/features/sideBarSlice";
import { SectionName as DrawerSection } from "../../app/features/types";
import NewGroupDrawerSection from "./NewGroupDrawerSection";
import SettingsDrawerSection from "./SettingsDrawerSection";

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
