import { ChangeEvent, SyntheticEvent, MouseEvent } from "react";
import {
  Alert,
  MenuItem,
  SelectChangeEvent,
  Button as ButtonMui,
  Chip,
} from "@mui/material";
import { InputText } from "@components/_shared/Inputs/InputText";
import { LatInput } from "@components/_shared/Inputs/LatInput";
import { LongInput } from "@components/_shared/Inputs/LongInput";
import { Select } from "@components/_shared/Inputs/Select";
import { Typography } from "@components/_shared/Typography";
import { Button } from "@components/_shared/Button";
import { Switch } from "@components/_shared/Switch";
import { periodOptionsData } from "@src/data/data";
import { FormErrors } from "@hooks/useFormWithValidation";
import { IDev, ISensor } from "@src/types/IDev";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import { latRegex, longRegex } from "@src/utils/regexp";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  device: IDev | null;
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
  handleChecked: (event: ChangeEvent<HTMLInputElement>) => void;
  handleAddSensors: (event: MouseEvent) => void;
  handleDelete: (depth: number) => void;

  errors: FormErrors;
  sensors: ISensor[] | undefined;
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
  isValid: boolean;
}
export const EditDevView = (props: Props) => {
  const {
    device,
    handleChange,
    handleSelectChange,
    handleCloseSelect,
    handleChecked,
    handleAddSensors,
    handleDelete,
    errors,
    sensors,
    message,
    isSuccessSave,
    isErrorSave,
    isLoading,
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
            defaultValue={device?.number}
            onChange={handleChange}
            error={Boolean(errors.number)}
            helperText={errors.number}
          />
          <InputText
            name="name"
            label="Название устройства"
            defaultValue={device?.name}
            onChange={handleChange}
            error={Boolean(errors.name)}
            helperText={errors.name}
          />
          <InputText
            defaultValue={device?.latitude}
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
            defaultValue={device?.longitude}
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
            value={device?.period_sess}
            error={Boolean(errors.period_sess)}
            helperText={errors.period_sess}
          >
            {periodOptionsData.map((option) => (
              <MenuItem key={option.id} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <Switch
            name="deleted"
            label="Заблокировать"
            checked={device?.deleted}
            handleChange={handleChecked}
          />
          <InputText
            name="info"
            label="Информация"
            multiline={true}
            defaultValue={device?.info}
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
          {sensors?.length !== 0 && (
            <div className={cx("sensors-container")}>
              <Typography variant="body1">
                Список сенсоров на устройстве: {sensors?.length}
              </Typography>
              <ul className={cx("sensors")}>
                {sensors?.map((item, i) => (
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
        <Button isLoading={isLoading} disabled={!isValid}>
          Сохранить
        </Button>
      </div>
    </>
  );
};
