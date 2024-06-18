import React, { useEffect } from "react";
import { Login } from "@components/Login";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { IQuery } from "@src/types/IQuery";
import { useFormValidation } from "@hooks/useFormWithValidation";

export const LoginPage = () => {
  const cx = useStyles(styles);

  return (
    <section className={cx("section")}>
      <Login />
    </section>
  );
};
