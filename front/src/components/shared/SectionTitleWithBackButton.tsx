import { Button, Stack, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

type Props = {
  title: string;
  onBackClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function SectionTitleWithBackButton({ title, onBackClick }: Props) {
  return (
    <Stack justifyContent="space-between" direction="row">
      <Typography
        component="h2"
        fontSize="1.2em"
        fontWeight="light"
        lineHeight="2em"
        display="flex"
      >
        <Button sx={{ display: "inline-flex" }} onClick={onBackClick}>
          <ArrowBackIcon />
        </Button>
        {title}
      </Typography>
    </Stack>
  );
}
