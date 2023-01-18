import { Container, Paper } from "@mui/material";

type FormCenteredProps = {
  children: React.ReactNode;
};

//TODO: transform this into styled components
export function FormCentered({ children }: FormCenteredProps) {
  return (
    <Container
      sx={{
        width: "calc(max(min(1500px - 80vw, 98vw), 40vw))",
        minHeight: "100vh",
        display: "flex",
        flexFlow: "column wrap",
        justifyContent: "center",
      }}
    >
      <Paper elevation={3} sx={{ padding: "2em" }}>
        {children}
      </Paper>
    </Container>
  );
}
