import React, { FC } from "react";
import { Typography as TypographyMui } from "@mui/material";

type size =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "subtitle1"
  | "subtitle2"
  | "body1"
  | "body2"
  | "caption"
  | "button"
  | "overline"
  | "inherit";
interface Props {
  className?: string;
  children?: React.ReactNode;
  variant?: size;
}
export const Typography: FC<Props> = ({ className, children, variant }) => {
  return (
    <TypographyMui className={className} variant={variant}>
      {children}
    </TypographyMui>
  );
};
