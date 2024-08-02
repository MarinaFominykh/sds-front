import { FC, ReactNode } from "react";
import Button from "@mui/material/Button";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  handleClick: () => void;
  children: ReactNode;
}

export const BigButton: FC<Props> = ({ handleClick, children }) => {
  const cx = useStyles(styles);
  return (
    <Button
      className={cx("button")}
      variant="contained"
      onClick={handleClick}
      sx={{
        backgroundColor: "#e3edff",
        color: "#266bf1",
        width: "100%",
        padding: "16px",
        "&:hover": {
          backgroundColor: "#e3edff",
          borderColor: "#0062cc",
          boxShadow: "none",
        },
        "&:active": {
          boxShadow: "none",
          backgroundColor: "#e3edff",
          borderColor: "#005cbf",
        },
      }}
    >
      {children}
    </Button>
  );
};
