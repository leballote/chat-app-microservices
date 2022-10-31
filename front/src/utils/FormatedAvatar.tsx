import { Chat } from "../types/ChatSectionTypes";
import Avatar from "@mui/material/Avatar";

function getAvatarInitialsFromName(name: string): string {
  if (name == "" || name == null) {
    return "";
  }
  const splitted = name.split(" ") ?? ["N", "A"];
  if (splitted.length == 1) {
    let word = splitted[0];
    if (word.length == 1) {
      return word[0];
    } else {
      return word[0] + word[1];
    }
  } else {
    return splitted[0][0] + splitted[1][0];
  }
}

interface WithSrc {
  avatarSrc: string;
}
interface WithName {
  avatarName: string;
}

type AvatarInfo = WithSrc | WithName;

function hasSrc(avatarInfo: AvatarInfo): avatarInfo is WithSrc {
  return (avatarInfo as WithSrc).avatarSrc !== undefined;
}

export default function (avatarInfo: AvatarInfo) {
  if (hasSrc(avatarInfo)) {
    const { avatarSrc } = avatarInfo;
    return <Avatar src={avatarSrc} />;
  } else {
    const { avatarName } = avatarInfo;
    const formatedAvatarName = getAvatarInitialsFromName(avatarName);
    return <Avatar>{formatedAvatarName}</Avatar>;
  }
}
