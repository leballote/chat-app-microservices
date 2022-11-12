import {
  Box,
  Typography,
  List,
  Button,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import FormatedAvatar from "../utils/FormatedAvatar";
import indexArrayByField from "../utils/indexArrayByField";
import CloseIcon from "@mui/icons-material/Close";
import { removeParticipant } from "../app/features/newGroupSectionDrawerSlice";

export function ParticipantsToAdd() {
  const contacts = useAppSelector((state) => state.contactsPreviews.value);
  const contactsMap = indexArrayByField(contacts, "id");
  const dispatch = useAppDispatch();
  const participants = useAppSelector(
    (state) => state.newGroupSectionDrawer.participantsToAdd
  );
  const participantsLength = participants.length;

  return (
    <Box>
      <List
        sx={{
          display: "flex",
          flexFlow: "wrap row",
          maxHeight: "15em",
          overflowX: "auto",
          columnGap: ".5em",
          rowGap: ".1em",
          margin: "0 1em",
        }}
      >
        {participants.map((participantId) => {
          const avatarOptions = {
            avatarName: contactsMap[participantId].name,
            avatarSrc: contactsMap[participantId].avatar,
          };
          return (
            <ListItem
              key={participantId}
              sx={{
                display: "flex",
                width: "fit-content",
                blockSize: "fit-content",
                flex: "1 0 1",
                // border: "1px solid red",
                // overflowWrap: "break-word", // I think this is given by default in reactMUI
                padding: "0",
                gap: ".2em",
              }}
            >
              <Box sx={{ display: "inline-flex" }}>
                <ListItemAvatar sx={{ margin: "0 .2em", minWidth: "" }}>
                  <FormatedAvatar
                    {...avatarOptions}
                    sx={{ width: "1.5em", height: "1.5em", minWidth: "" }}
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexFlow: "column wrap",
                  }}
                >
                  <Typography fontSize="small">
                    {contactsMap[participantId].name}
                  </Typography>
                </ListItemText>
              </Box>
              <Box sx={{ flex: "10%" }}>
                <Button
                  size="small"
                  data-to-remove-id={`${participantId}`}
                  sx={{
                    width: "100%",
                    aspectRatio: "1/1",
                    minWidth: "",
                    margin: "0",
                    padding: "0",
                  }}
                  onClick={(ev) => {
                    const participantIdToRemove =
                      ev.currentTarget.dataset["toRemoveId"];
                    if (participantIdToRemove) {
                      dispatch(removeParticipant(participantIdToRemove));
                    }
                  }}
                >
                  <CloseIcon fontSize="small" sx={{ margin: "0" }} />
                </Button>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

// export function ParticipantsToAdd() {
//   // const contacts = useAppSelector((state) => state.contactsPreviews.value);
//   const contacts = contactsMock;
//   console.log(contacts);
//   const contactsMap = indexArrayByField(contacts, "id");
//   const participants = useAppSelector(
//     (state) => state.newGroupSectionDrawer.participantsToAdd
//   );

//   return (
//     <List
//       sx={
//         {
//           // display: "flex",
//           // flexFlow: "wrap row",
//           // maxHeight: "10em",
//           // overflowX: "auto",
//           // columnGap: ".5em",
//         }
//       }
//     >
//       {participants.map((participantId) => {
//         const avatarOptions = {
//           avatarName: contactsMap[participantId].name,
//           avatarSrc: contactsMap[participantId].avatar,
//         };
//         return (
//           <ListItem
//             key={participantId}
//             sx={{
//               display: "inline-flex",
//               // width: "100%",
//               // flexBasis: "",
//               width: "fit-content",
//               blockSize: "fit-content",
//               flex: "1 0 1",
//               border: "1px solid red",
//               overflowWrap: "break-word",
//             }}
//           >
//             <ListItemAvatar>
//               <Avatar
//                 sx={{
//                   width: 60,
//                   height: 60,
//                 }}
//               ></Avatar>
//               {/* <FormatedAvatar {...avatarOptions} /> */}
//             </ListItemAvatar>
//             <ListItemText>
//               <Typography fontSize="small">
//                 {contactsMap[participantId].name}
//               </Typography>
//             </ListItemText>
//             {/* {JSON.stringify(contactsMap[participantId])} */}
//           </ListItem>
//         );
//       })}
//     </List>
//   );
// }
