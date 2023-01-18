import { List, ListItem, Skeleton, Stack } from "@mui/material";

type Props = {
  numberOfPeople: number;
};

export default function GenericPeopleLoading({ numberOfPeople }: Props) {
  const list = [];
  for (let i = 0; i < numberOfPeople; i++) {
    list.push(i);
  }
  return (
    <List>
      {list.map((no) => {
        return (
          <Stack
            key={no}
            direction="row"
            padding="0.6em 1em"
            component={ListItem}
            gap={2}
          >
            <Skeleton variant="circular" height={60} width={60} />
            <Skeleton
              variant="rectangular"
              height={60}
              width={"calc(100% - 80px)"}
              key={2}
            />
          </Stack>
        );
      })}
    </List>
  );
}
