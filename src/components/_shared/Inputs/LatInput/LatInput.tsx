import React, { FormEvent } from "react";

import { IMaskInput } from "react-imask";

interface IProps {
  //onChange: (event: { target: { name: string; value: string } }) => void;
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  name: string;
}

export const LatInput = React.forwardRef<HTMLInputElement, IProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, name, ...other } = props;

    return (
      <IMaskInput
        {...other}
        mask="0[0].0{00000000000000000000000}"
        placeholder={"53.45454464..."}
        inputRef={ref}
        name={props.name}
        // onAccept={(value: any) =>
        //   onChange({ target: { name: props.name, value } })
        // }
        onChange={(e) => onChange(e)}
        overwrite
      />
    );
  }
);
