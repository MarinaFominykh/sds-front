import {
  FC,
  ChangeEvent,
  SetStateAction,
  Dispatch,
  SyntheticEvent,
  MouseEvent,
} from "react";
import {
  SelectChangeEvent,
  TextareaAutosize,
  MenuItem,
  Alert,
  Divider,
  Button as ButtonMui,
  Stack,
} from "@mui/material";
import { InputText } from "@components/_shared/Inputs/InputText";

import { Button } from "@components/_shared/Button";
import { Select } from "@components/_shared/Inputs/Select";
import { Switch } from "@components/_shared/Switch";

import { IOrg } from "@src/types/IOrg";
import { FormErrors, FormValues } from "@hooks/useFormWithValidation";
import { IJob } from "@src/types/IJob";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";

import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  handleCheck: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleSelectChange: (event: SelectChangeEvent) => void;
  // handleChangeMackInput: (
  //   event: {
  //     target: { name: string; value: string };
  //   },
  //   regexp: RegExp
  // ) => void;
  handleCloseSelect: (
    event: SyntheticEvent<Element, Event>,
    name: string
  ) => void;
  handleBlur: (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  handleOpenModal: (event: MouseEvent) => void;
  handleChecked: (event: ChangeEvent<HTMLInputElement>) => void;
  orgs: IOrg[];
  jobs: IJob[];
  values: FormValues;
  errors: { [name: string]: string };
  setValues: Dispatch<SetStateAction<FormValues>>;
  setErrors: Dispatch<SetStateAction<FormErrors>>;
  isValid: boolean;
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
}

export const NewUserView: FC<Props> = ({
  handleChange,
  handleSelectChange,
  handleCloseSelect,
  handleOpenModal,
  handleChecked,
  orgs,
  jobs,
  values,
  errors,
  isValid,
  message,
  isSuccessSave,
  isErrorSave,
  isLoading,
}) => {
  const cx = useStyles(styles);
  const isValidForm = () => {
    return isValid && Boolean(values.id_org);
  };

  return (
    <>
      <div className={cx("container")}>
        <fieldset className={cx("name_container")}>
          <InputText
            onChange={handleChange}
            name="family"
            label="Фамилия"
            error={Boolean(errors.family)}
            helperText={errors.family}
          />
          <InputText
            name="name"
            onChange={handleChange}
            error={Boolean(errors.name)}
            label="Имя"
            helperText={errors.name}
          />
          <InputText
            onChange={handleChange}
            required={false}
            name="father"
            label="Отчество"
            error={Boolean(errors.father)}
            helperText={errors.father}
          />
        </fieldset>
        <fieldset className={cx("contacts_container")}>
          {/* <InputText
            label="Телефон"
            onChange={(e) => handleChangeMackInput(e, phoneRegex)}
            onBlur={handleBlur}
            name="telephone"
            value={values.telephone || ""}
            error={Boolean(errors.telephone)}
            helperText={errors.telephone}
            InputProps={{ inputComponent: TelInput, style: { fontSize: 12 } }}
            inputNativeProps={{
              pattern: "^(.*[a-zA-Z]){6,}",
            }}
          /> */}
        </fieldset>
        <InputText
          onChange={handleChange}
          name="email"
          label="E-mail"
          type="email"
          error={Boolean(errors.email)}
          helperText={errors.email}
        />
        <Select
          onChange={handleSelectChange}
          onClose={(e) => {
            handleCloseSelect(e, "id_org");
          }}
          label="Организация*"
          inputProps={{
            name: "id_org",
          }}
          value={(values.id_org as string) || ""}
          error={Boolean(errors.id_org)}
          helperText={errors.id_org}
        >
          <MenuItem value=""></MenuItem>
          {orgs?.map((org) => (
            <MenuItem key={org.id} value={org.id}>
              {org.full_name}
            </MenuItem>
          ))}
        </Select>
        <Select
          onChange={handleSelectChange}
          onClose={(e) => {
            handleCloseSelect(e, "id_jobs");
          }}
          label="Должность*"
          inputProps={{
            name: "id_jobs",
          }}
          value={(values.id_jobs as string) || ""}
          error={Boolean(errors.id_jobs)}
          helperText={errors.id_jobs}
        >
          {jobs?.map((job) => (
            <MenuItem key={job.id} value={job.id}>
              {job.name}
            </MenuItem>
          ))}
          <Divider />
          <Stack className={cx("button-container")}>
            <ButtonMui
              className={cx("add-job-button")}
              variant="text"
              onClick={(e) => handleOpenModal(e)}
            >
              +Добавить должность
            </ButtonMui>
          </Stack>
        </Select>

        <InputText
          onChange={handleChange}
          name="login"
          label="Логин"
          error={Boolean(errors.login)}
          helperText={errors.login}
        />
        <InputText
          onChange={handleChange}
          name="password"
          label="Пароль"
          type="password"
          placeholder="Не менее 6 знаков, включая буквы, цифры и спец.символы"
          error={Boolean(errors.password)}
          helperText={errors.password}
        />

        <InputText
          onChange={handleChange}
          name="repeat"
          label="Повторите пароль"
          type="password"
          error={Boolean(errors.repeat)}
          helperText={errors.repeat}
        />
        <Switch
          name="user_w"
          label="Разрешить редактировние"
          handleChange={handleChecked}
        />

        <TextareaAutosize
          name="info"
          minRows={4}
          className="info"
          onChange={handleChange}
        />
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
        <Button disabled={!isValidForm()} isLoading={isLoading}>
          Сохранить
        </Button>
      </div>
    </>
  );
};
