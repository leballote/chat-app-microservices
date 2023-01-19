import Avatar from "@mui/material/Avatar";

function getAvatarInitialsFromName(name: string): string {
  if (name == "" || name == null) {
    return "";
  }
  const splitted = name.split(" ") ?? ["N", "A"];
  if (splitted.length == 1) {
    const word = splitted[0];
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
  avatarName?: string;
}
interface WithName {
  avatarName: string;
  avatarSrc?: string;
}

type AvatarInfo = WithSrc | WithName;

function hasSrc(avatarInfo: AvatarInfo): avatarInfo is WithSrc {
  return (avatarInfo as WithSrc).avatarSrc !== undefined;
}

type AvatarProps = React.ComponentProps<typeof Avatar>;

type Props = AvatarInfo & AvatarProps;

export default function FormatedAvatar(avatarInfo: Props) {
  if (hasSrc(avatarInfo)) {
    const { avatarSrc, avatarName, ...avatarProps } = avatarInfo; // eslint-disable-line
    return <Avatar src={avatarSrc} {...avatarProps} />;
  } else {
    const { avatarName, avatarSrc, ...avatarProps } = avatarInfo; // eslint-disable-line
    const formatedAvatarName = getAvatarInitialsFromName(avatarName);
    return <Avatar {...avatarProps}>{formatedAvatarName}</Avatar>;
  }
}
