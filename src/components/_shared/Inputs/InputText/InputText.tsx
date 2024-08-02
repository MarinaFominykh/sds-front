import { FC, ChangeEvent } from "react";
import { TextField } from "@mui/material";

import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  id?: string;
  name?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  sx?: object;
  InputProps?: object;
  inputNativeProps?: object;
  InputLabelProps?: object;
  error?: boolean;
  helperText?: string;
  onChange?: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  onBlur?: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  value?: string;
  defaultValue?: string;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;

  type?: "text" | "email" | "password" | "number" | "decimal";
}
export const InputText: FC<Props> = ({
  id,
  name,
  required = true,
  label,
  placeholder,
  sx,

  InputProps = { style: { fontSize: 12 } },
  inputNativeProps,
  InputLabelProps = { style: { fontSize: 12 } },
  error,
  helperText,
  onChange,
  onBlur,
  value,
  defaultValue,
  variant = "outlined",
  fullWidth = true,
  disabled = false,
  multiline = false,
  rows,

  type = "text",
}) => {
  const cx = useStyles(styles);
  return (
    <TextField
      id={id}
      name={name}
      required={required}
      variant={variant}
      label={label}
      placeholder={placeholder}
      size="small"
      fullWidth={fullWidth}
      inputProps={inputNativeProps}
      InputLabelProps={InputLabelProps}
      InputProps={InputProps}
      error={error}
      helperText={helperText}
      className={cx("input")}
      sx={sx}
      // sx={{
      //   background: "transparent",
      //   boxSizing: "border-box",
      // }}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      defaultValue={defaultValue}
      disabled={disabled}
      multiline={multiline}
      rows={rows}
      type={type}
    ></TextField>
  );
};
