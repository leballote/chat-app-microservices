import TextField from "@mui/material/TextField";
import { ChangeEvent } from "react";

import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  value?: string;
  onSearch: (ev: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (ev: KeyboardEvent) => void;
}

export default function SearchBar({ onSearch, onKeyDown, value }: Props) {
  return (
    <TextField
      sx={{ margin: ".2em .5em 0 .5em" }}
      size="small"
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      value={value}
      onChange={onSearch}
      //TODO: check what is going on with this event
      onKeyDown={onKeyDown as any}
    />
  );
}
