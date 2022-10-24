import { Typography, Container, Box } from "@mui/material";
import { useState } from "react";

//TODO: still don't know if this will be used
interface DashboardUser {
  name: string;
  info: string;
}

export default function DashboardSection() {
  const [user, setUser] = useState<DashboardUser>({
    name: "",
    info: "",
  });
}
