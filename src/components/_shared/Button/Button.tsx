import React, { FC, ReactNode } from "react";
import { Button as ButtonMui, CircularProgress } from "@mui/material";

interface Props {
  children: ReactNode;
  variant?: "contained" | "outlined" | "text";
  type?: "submit" | "reset" | "button";
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button: FC<Props> = ({
  children,
  variant = "contained",
  type = "submit",
  disabled = false,
  isLoading = false,
}) => {
  return (
    <ButtonMui
      variant={variant}
      type={type}
      sx={{ backgroundColor: "#266bf1", width: "118px", height: "36px" }}
      disabled={disabled}
    >
      {isLoading ? (
        <CircularProgress
          sx={{ color: "white" }}
          //color="secondary"
        />
      ) : (
        children
      )}
      {/* {children}
      <CircularProgress color="secondary" /> */}
    </ButtonMui>
  );
};
