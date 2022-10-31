import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ProfilePreview, { Props as ProfilePreviewProps } from "./ProfilePreview";
import ChatsDrawerSection from "./ChatsDrawerSection";
import ContactsIcon from "@mui/icons-material/Contacts";
import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts";

const userMock: ProfilePreviewProps = {
  id: "203",
  avatar:
    "https://avatars.dicebear.com/api/bottts/LuisBallote.svg?background=%2399e51b",
  name: "Luis Ballote",
  phrase: "Living is an oportunity to do the right thing",
  status: "online",
};

interface Props {
  onContactsClick: (ev: React.MouseEvent<HTMLElement>) => void;
  onMoreClick: (ev: React.MouseEvent<HTMLElement>) => void;
}

export default function MainDrawerView(props: Props) {
  const userInfo = useContext(CurrentUserContext);
  // const [userInfo, setUserInfo] = useState<ProfilePreviewProps>({
  //   id: "",
  //   avatar: "",
  //   name: "",
  //   phrase: "",
  //   status: "offline",
  // });

  // async function getProfilePreviewData() {
  //   setUserInfo(userMock);
  // }

  // useEffect(() => {
  //   getProfilePreviewData();
  // }, []);

  return userInfo ? (
    <>
      <ProfilePreview {...userInfo} />
      <Divider />
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button startIcon={<ContactsIcon />} onClick={props.onContactsClick}>
          Contacts
        </Button>
        <Button onClick={props.onMoreClick}>
          <MoreVertIcon />
        </Button>
      </Toolbar>
      <Divider />
      <ChatsDrawerSection />
    </>
  ) : (
    <h1>Temp</h1>
  );
}
