import { FC, ChangeEvent } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

interface Props {
  value?: boolean;
  defaultValue?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name: string;
}
export const RadioButton: FC<Props> = ({
  value,
  defaultValue,
  onChange,
  name,
}) => {
  //   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     setValue((event.target as HTMLInputElement).value);
  //   };

  return (
    <FormControl>
      <RadioGroup
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        name={name}
      >
        <FormControlLabel
          sx={{
            "& .MuiTypography-root": {
              fontSize: 12,
            },
          }}
          value={true}
          control={
            <Radio
              size="small"
              sx={{
                color: "#266bf1",
              }}
            />
          }
          label="Действующая"
        />
        <FormControlLabel
          sx={{
            "& .MuiTypography-root": {
              fontSize: 12,
            },
          }}
          value={false}
          control={
            <Radio
              size="small"
              sx={{
                color: "#266bf1",
              }}
            />
          }
          label="Закрытая"
        />
      </RadioGroup>
    </FormControl>
  );
};
