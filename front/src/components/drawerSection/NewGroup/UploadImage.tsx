import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Avatar, Stack } from "@mui/material";

type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export function UploadImage({ onClick }: Props) {
  return (
    <Stack justifyContent="center" direction="row" padding="2em 0">
      <Avatar
        onClick={onClick}
        sx={{
          width: "5em",
          height: "5em",
          "&:hover": {
            color: "grey.300",
            cursor: "pointer",
          },
        }}
      >
        <PhotoCameraIcon sx={{ fontSize: "2.5em" }} />
      </Avatar>
    </Stack>
  );
}
