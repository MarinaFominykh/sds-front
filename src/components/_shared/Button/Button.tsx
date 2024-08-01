import React, { FC, ReactNode } from "react";
import { Button as ButtonMui, CircularProgress } from "@mui/material";

interface Props {
  children: ReactNode;
  variant?: "contained" | "outlined" | "text";
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  isLoading?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: FC<Props> = ({
  children,
  variant = "contained",
  type = "submit",
  disabled = false,
  isLoading = false,
  onClick,
}) => {
  return (
    <ButtonMui
      variant={variant}
      type={type}
      sx={{ backgroundColor: "#266bf1", minWidth: "118px", height: "36px" }}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading ? <CircularProgress sx={{ color: "white" }} /> : children}
      {/* {children}
      <CircularProgress color="secondary" /> */}
    </ButtonMui>
  );
};
