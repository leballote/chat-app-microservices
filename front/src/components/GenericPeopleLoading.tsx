import { List, ListItem, Skeleton } from "@mui/material";

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
          <ListItem
            key={no}
            sx={{
              display: "flex",
              flexFlow: "row wrap",
              padding: "0.8em 1em",
              gap: ".8em",
            }}
          >
            <Skeleton variant="circular" height={60} width={60} />
            <Skeleton
              variant="rectangular"
              height={60}
              width={"calc(100% - 80px)"}
              key={2}
            />
          </ListItem>
        );
      })}
    </List>
  );
}
