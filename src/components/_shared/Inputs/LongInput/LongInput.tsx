import React, { FormEvent } from "react";
import { IMaskInput } from "react-imask";

interface IProps {
  onChange: (event: FormEvent<HTMLInputElement>) => void;
  name: string;
}

export const LongInput = React.forwardRef<HTMLInputElement, IProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="0[00].0{00000000000000000000000}"
        placeholder={"112.45454464..."}
        inputRef={ref}
        // onAccept={(value: any) =>
        //   onChange({ target: { name: props.name, value } })
        // }
        onChange={(e) => onChange(e)}
        overwrite
      />
    );
  }
);
