import React, { ChangeEvent, useEffect, useState } from "react";
import Drawer from "@mui/material/Drawer";
import MainDrawerView from "./MainDrawerView";
import ContactPreview from "./ContactPreview";
import ContactsDrawerSection from "./ContactsDrawerSection";

const drawerWidth = 280;

interface Chat {
  id: string;
  avatar: string;
  type: string;
  name: string;
  lastMessage: {
    sentBy: string;
    content: string;
    sentAt: string | string;
  };
}

enum DrawerSection {
  MAIN,
  CONTACTS,
}

export default function ResponsiveDrawer() {
  //TODO: Change any for the proper data type
  const [currentDrawerSection, setCurrentDrawerSection] =
    useState<DrawerSection>(DrawerSection.MAIN);

  let section;
  if (currentDrawerSection == DrawerSection.MAIN) {
    section = (
      <MainDrawerView
        onMoreClick={() => console.log("more clicked!")}
        onContactsClick={() => setCurrentDrawerSection(DrawerSection.CONTACTS)}
      />
    );
  } else if (currentDrawerSection == DrawerSection.CONTACTS) {
    section = (
      <ContactsDrawerSection
        //TODO handle on add contact click
        onAddContactClick={() => {}}
        onBackClick={() => setCurrentDrawerSection(DrawerSection.MAIN)}
      />
    );
  } else {
    throw Error("section not defined correctly");
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
