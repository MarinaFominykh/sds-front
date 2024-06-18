import React, { useState, FC, ChangeEvent } from "react";
import { FilledInput, TextField, IconButton } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
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

  type?: "text" | "email" | "password" | "number";
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
      type={type}
    ></TextField>
  );
};
