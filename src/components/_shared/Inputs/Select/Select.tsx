import { ReactNode, FC, SyntheticEvent } from "react";
import { SelectChangeEvent } from "@mui/material";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  FormHelperText,
} from "@mui/material";

interface Props {
  children: ReactNode;
  value?: string;
  defaultValue?: string;
  onChange: (event: SelectChangeEvent) => void;
  onClose?: (event: SyntheticEvent<Element, Event>) => void;
  error?: boolean;
  helperText?: string;
  label?: string;
  name?: string;
  inputProps?: { [key: string]: any };
}

export const Select: FC<Props> = ({
  children,
  value,
  defaultValue,
  onChange,
  onClose,
  error,
  helperText,
  label,
  name,
  inputProps,
}) => {
  const cx = useStyles(styles);
  return (
    <FormControl
      error={error}
      size="small"
      className={cx("select_control")}
      sx={{ width: "100%" }}
    >
      <InputLabel className={cx("label")}>{label}</InputLabel>
      <MuiSelect
        value={value}
        defaultValue={defaultValue}
        label={label}
        onChange={onChange}
        onClose={onClose}
        name={name}
        className={cx("select")}
        inputProps={inputProps}
      >
        {children}
      </MuiSelect>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
