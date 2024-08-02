import { FC, ChangeEvent, SyntheticEvent, MouseEvent } from "react";
import {
  Alert,
  MenuItem,
  SelectChangeEvent,
  Button as ButtonMui,
  Chip,
} from "@mui/material";

import { InputText } from "@components/_shared/Inputs/InputText";
import { Select } from "@components/_shared/Inputs/Select";
import { LatInput } from "@components/_shared/Inputs/LatInput";
import { LongInput } from "@components/_shared/Inputs/LongInput";
import { Button } from "@components/_shared/Button";
import { Typography } from "@components/_shared/Typography";
import { latRegex, longRegex } from "@src/utils/regexp";
import { periodOptionsData } from "@src/data/data";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { FormErrors, FormValues } from "@hooks/useFormWithValidation";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";
import { ISensor } from "@src/types/IDev";

interface Props {
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
    regexp?: RegExp
  ) => void;
  handleSelectChange: (event: SelectChangeEvent) => void;
  handleCloseSelect: (
    event: SyntheticEvent<Element, Event>,
    name: string
  ) => void;
  handleAddSensors: (event: MouseEvent) => void;
  handleDelete: (depth: number) => void;
  values: FormValues;
  errors: FormErrors;
  sensors: ISensor[];
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
  isValid: boolean;
}

export const NewDevView: FC<Props> = (props) => {
  const {
    handleChange,
    handleCloseSelect,
    handleSelectChange,
    handleAddSensors,
    handleDelete,
    //register,

    errors,
    sensors,
    message,
    //fields,
    isErrorSave,
    isLoading,
    isSuccessSave,
    isValid,
  } = props;
  const cx = useStyles(styles);

  return (
    <>
      <div className={cx("container")}>
        <fieldset className={cx("fields")}>
          <InputText
            name="number"
            label="Номер устройства"
            onChange={handleChange}
            error={Boolean(errors.number)}
            helperText={errors.number}
          />
          <InputText
            name="name"
            label="Название устройства"
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <InputText
            InputProps={{
              inputComponent: LatInput,
              style: { fontSize: 12 },
            }}
            name="latitude"
            label="Широта"
            onChange={(e) => handleChange(e, latRegex)}
            error={Boolean(errors.latitude)}
            helperText={errors.latitude}
          />
          <InputText
            InputProps={{
              inputComponent: LongInput,
              style: { fontSize: 12 },
            }}
            name="longitude"
            label="Долгота"
            onChange={(e) => handleChange(e, longRegex)}
            error={Boolean(errors.longitude)}
            helperText={errors.longitude}
          />

          <Select
            name="period_sess"
            label="Период сессии *"
            onChange={handleSelectChange}
            onClose={(e) => handleCloseSelect(e, "period_sess")}
            defaultValue="1"
            //value={String(values.period_sess)}
            error={Boolean(errors.period_sess)}
            helperText={errors.period_sess}
          >
            {periodOptionsData.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <InputText
            name="info"
            label="Информация"
            multiline={true}
            onChange={handleChange}
            rows={4}
            required={false}
          />
          <ButtonMui
            sx={{ width: "max-content" }}
            type="button"
            variant="text"
            onClick={handleAddSensors}
          >
            Добавить сенсоры
          </ButtonMui>
          {sensors.length !== 0 && (
            <div className={cx("sensors-container")}>
              <Typography variant="body1">
                Список сенсоров на устройстве: {sensors.length}
              </Typography>
              <ul className={cx("sensors")}>
                {sensors.map((item, i) => (
                  <li key={i}>
                    <Chip
                      label={`глубина: ${item.depth}`}
                      onDelete={() => handleDelete(item.depth)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </fieldset>
      </div>
      {message && (
        <Alert className={cx("alert")} severity="error">
          {message}
        </Alert>
      )}
      {isSuccessSave && (
        <Alert className={cx("alert")} severity="success">
          {SAVE_SUCCESS}
        </Alert>
      )}
      {isErrorSave && (
        <Alert className={cx("alert")} severity="error">
          {SAVE_ERROR}
        </Alert>
      )}

      <div className={cx("button")}>
        <Button disabled={!isValid} isLoading={isLoading}>
          Сохранить
        </Button>
      </div>
    </>
  );
};
