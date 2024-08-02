import { useState, useEffect, FormEvent, FC, ChangeEvent } from "react";

import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { EditLocationView } from "./EditLocationView";
import { FormValues, useFormValidation } from "@hooks/useFormWithValidation";
import { useGetAllOrgsQuery } from "@src/redux/services/orgApi";
import { useEditLocationMutation } from "@src/redux/services/locacationApi";
import { setSelectedLocation } from "@src/redux/reducers/locationSlice";
import { IOrg } from "@src/types/IOrg";
import { INVALID_FORM } from "@src/utils/messages";
import { ILocation } from "@src/types/ILocation";

interface Props {
  handleClose: () => void;
}

export const EditLocation: FC<Props> = ({ handleClose }) => {
  const dispatch = useAppDispatch();
  const {
    values,
    errors,
    //handleChange,
    handleSelectChange,
    handleCloseSelect,
    handleCheckboxChange,
    resetForm,
  } = useFormValidation();
  const { selectedLocation } = useAppSelector((state) => state.locationSlice);
  const { data: orgs } = useGetAllOrgsQuery({});
  const [editLocation, { isError, isLoading, isSuccess }] =
    useEditLocationMutation();
  const [message, setMessage] = useState("");

  const [orgsOptions, setOrgsOptions] = useState<(IOrg | undefined)[]>([
    selectedLocation?.org,
  ]);

  const handleChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    dispatch(
      setSelectedLocation({ ...(selectedLocation as ILocation), [name]: value })
    );
  };

  const generateArgs = (values: FormValues) => {
    const args = {
      id: selectedLocation?.id ?? "",
      parent_id: selectedLocation?.parent_id ?? "",
      g_name: values.g_name,
      latitude: values.latitude,
      longitude: values.longitude,
      org_id: values.org_id,
      g_info: values.g_info,
      deleted: values.deleted === "on" ? true : false,
    };
    return args;
  };
  const validationFormValues = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());
    const { g_name, org_id, latitude, longitude } = formJson;

    if (!g_name || !org_id || !latitude || !longitude) {
      setMessage(INVALID_FORM);
    } else {
      setMessage("");
      changeLocation(formJson);
    }
  };
  const changeLocation = (formValues: FormValues) => {
    const args = generateArgs(formValues);
    editLocation(args);
  };

  useEffect(() => {
    if (orgs && "data" in orgs) setOrgsOptions(orgs.data);
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        handleClose();
        resetForm();
      }, 2000);
    }
  }, [isSuccess]);

  return (
    <form onSubmit={validationFormValues} noValidate>
      <EditLocationView
        location={selectedLocation}
        orgs={orgsOptions}
        values={values}
        errors={errors}
        message={message}
        handleChange={handleChange}
        handleCloseSelect={handleCloseSelect}
        handleSelectChange={handleSelectChange}
        handleChecked={handleCheckboxChange}
        isSuccessSave={isSuccess}
        isErrorSave={isError}
        isLoading={isLoading}
      />
    </form>
  );
};
