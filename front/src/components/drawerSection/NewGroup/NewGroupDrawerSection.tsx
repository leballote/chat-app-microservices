import { GroupSectionDrawerSubsection as DrawerSubsection } from "../../../app/features/appView/types";
import { useAppSelector } from "../../../app/hooks";
import AddParticipantsDrawerSubsection from "./AddParticipantsDrawerSubsection";
import SetTitleAndAvatarDrawerSubsection from "./SetTitleAndAvatarDrawerSubsection";

export default function NewGroupDrawerSection() {
  const { subsection } = useAppSelector((state) => state.newGroupSectionDrawer);

  let component: React.ReactElement;
  if (subsection == DrawerSubsection.ADD_FRIENDS) {
    component = <AddParticipantsDrawerSubsection />;
  } else {
    component = <SetTitleAndAvatarDrawerSubsection />;
  }

  return component;
}
