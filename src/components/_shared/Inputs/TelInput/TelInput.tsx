import React from "react";

import { IMaskInput } from "react-imask";

interface IProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TelInput = React.forwardRef<HTMLInputElement, IProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="+7 000-000-00-00"
        definitions={{
          "#": /[1-9]/,
        }}
        placeholder={"+7 111-222-33-44"}
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite
      />
    );
  }
);

export default TelInput;
