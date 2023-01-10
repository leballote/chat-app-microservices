export type User = {
  id: string;
  username: string;
  name: string;
  phrase: string;
  avatar: string;
  status: "online" | "offline";
  settings: UserSettings;
} | null;

export type UserSettings = {
  language: string;
};

export type ContactPreview = {
  id: string;
  name: string;
  avatar: string;
  phrase: string;
  individualChat: {
    id: string;
  };
  status: "ONLINE" | "OFFLINE";
};
