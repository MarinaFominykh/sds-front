import { useState, FC } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ListSubheader,
  TextField,
  InputAdornment,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { containsText } from "@src/utils/functions";

interface Props {
  name: string;
  options: any[];
  label: string;
  isDisabled?: boolean;
  onChange?: (e: SelectChangeEvent) => void;
  value?: string;
  defaultValue?: string;
  onClose?: () => void;
  isDev?: boolean;
  displayEmpty?: boolean;
  required?: boolean;
}

export const SelectWithSearch: FC<Props> = ({
  name,
  options,
  label,
  isDisabled,
  onChange,
  value,
  defaultValue,
  onClose,
  isDev,
  displayEmpty = false,
  required = true,
}) => {
  const [searchText, setSearchText] = useState("");
  const displayedOptions = options.filter((option) =>
    containsText(option?.name, searchText)
  );

  const handleClose = () => {
    setSearchText("");
    onClose?.();
  };

  return (
    <FormControl
      disabled={isDisabled}
      fullWidth
      size="small"
      sx={{ mt: "14px" }}
    >
      <InputLabel sx={{ fontSize: "12px" }}>{label}</InputLabel>
      <Select
        name={name}
        required={required}
        MenuProps={{ autoFocus: false }}
        sx={{ fontSize: "12px" }}
        value={value}
        defaultValue={defaultValue}
        label={label}
        onChange={onChange}
        onClose={handleClose}
        displayEmpty={displayEmpty}
      >
        <ListSubheader>
          <TextField
            size="small"
            autoFocus
            placeholder="Начните вводить название..."
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key !== "Escape") {
                e.stopPropagation();
              }
            }}
          />
        </ListSubheader>
        {isDev && (
          <MenuItem value="">
            <em>Ничего не выбирать</em>
          </MenuItem>
        )}

        {displayedOptions.map((option, _) => (
          <MenuItem
            key={option.id}
            value={option.id}
            sx={{
              fontSize: "12px",
              fontWeight: `${option.parent_id === "0" ? "600" : "400"}`,
              pl: `${option.parent_id === "0" ? "16px" : "32px"}`,
            }}
          >
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
