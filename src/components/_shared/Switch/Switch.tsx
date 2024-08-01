import React, { FC } from "react";
import {
  Switch as SwitchMui,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
interface Props {
  name: string;
  label: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
  checked?: boolean;
}

export const Switch: FC<Props> = ({
  handleChange,
  name,
  label,
  defaultChecked,
  checked,
}) => {
  const cx = useStyles(styles);
  return (
    <FormGroup className={cx("switch-container")}>
      <FormControlLabel
        className={cx("switch-label")}
        label={label}
        control={
          <SwitchMui
            name={name}
            size="small"
            onChange={handleChange}
            defaultChecked={defaultChecked}
            checked={checked}
          />
        }
      ></FormControlLabel>
    </FormGroup>
  );
};
