import TextField from "@mui/material/TextField";
import { ChangeEvent, KeyboardEventHandler } from "react";

import { InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

interface Props {
  onSearch: (ev: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: KeyboardEventHandler<HTMLDivElement>;
}

export default function SearchBar({ onSearch, onKeyDown }: Props) {
  const { t } = useTranslation();
  return (
    <TextField
      sx={{ margin: ".2em .5em 0 .5em" }}
      size="small"
      placeholder={String(t("general.search"))}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      inputProps={{ maxLength: 100 }}
      // value={value}
      onChange={onSearch}
      //TODO: check what is going on with this event
      onKeyDown={onKeyDown}
    />
  );
}
