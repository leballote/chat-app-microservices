export type User = {
  id: string;
  username: string;
  name: string;
  phrase: string;
  status: "online" | "offline";
} | null;
