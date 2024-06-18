import React from "react";
import { IMaskInput } from "react-imask";

interface IProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const IdInput = React.forwardRef<HTMLInputElement, IProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0000000000}"
        placeholder={"0000000000"}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);
