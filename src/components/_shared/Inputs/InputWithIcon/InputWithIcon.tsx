import { useState, FC, ChangeEvent } from "react";
import { TextField, IconButton } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  onChange: (value: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  name: string;
  variant?: "outlined" | "filled" | "standard";
}
export const InputWithIcon: FC<Props> = ({
  onChange,
  placeholder,
  name,
  variant = "standard",
}) => {
  const cx = useStyles(styles);
  const [isShow, setIsShow] = useState(false);

  const handleClick = () => {
    setIsShow(!isShow);
  };
  return (
    <TextField
      name={name}
      className={cx("input")}
      sx={{
        background: "transparent",
        boxSizing: "border-box",
      }}
      onChange={onChange}
      placeholder={placeholder}
      fullWidth
      variant={variant}
      type={isShow ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <IconButton onClick={handleClick} edge="end" className={cx("button")}>
            {isShow ? (
              <VisibilityOffOutlinedIcon />
            ) : (
              <VisibilityOutlinedIcon />
            )}
          </IconButton>
        ),
      }}
    ></TextField>
  );
};
