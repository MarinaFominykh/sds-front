import React, { FC } from "react";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  onClose: () => void;
}
export const CloseButton: FC<Props> = ({ onClose }) => {
  return (
    <IconButton onClick={onClose}>
      <CloseIcon sx={{ color: "#1976D2" }} />
    </IconButton>
  );
};
