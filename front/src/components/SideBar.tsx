import React, { ChangeEvent, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MainDrawerView from "./MainDrawerView";
import ContactPreview from "./ContactPreview";
import ContactsDrawerSection from "./ContactsDrawerSection";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getValue } from "../app/features/currentUserSlice";
import {
  setContactsDrawerSection,
  setMainDrawerSection,
} from "../app/features/sideBarSlice";
import { SectionName as DrawerSection } from "../app/features/types";
import NewGroupDrawerSection from "./NewGroupDrawerSection";

const drawerWidth = 400;

export default function ResponsiveDrawer() {
  //TODO: Change any for the proper data type
  const { name: currentDrawerSection } = useAppSelector(
    (state) => state.sideBar
  );
  const dispatch = useAppDispatch();

  let section;
  if (currentDrawerSection == DrawerSection.MAIN) {
    section = (
      <MainDrawerView
        //TODO: this doesn't work anymore
        onMoreClick={() => {
          console.log("clicked more");
        }}
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
  } else {
    throw Error("This should be unreachable");
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          position: "static",
          height: "100vh",
        },
      }}
      open
    >
      {section}
    </Drawer>
  );
}
