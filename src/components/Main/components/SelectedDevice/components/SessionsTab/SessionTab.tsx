import { FormEvent, useState, useEffect } from "react";
import { SessonsTabView } from "./SessonsTabView";
import { useFormValidation } from "@hooks/useFormWithValidation";
import { useAuth } from "@hooks/useAuth";
import { useAppSelector } from "@hooks/redux";
import { useGetSelectedDevSessionByPeriodQuery } from "@src/redux/services/devsApi";

export const SessionTab = () => {
  const auth = useAuth();
  const { errors, values, handleChange, isValid } = useFormValidation();
  const [isPeriod, setIsPeriod] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { selectedDev, isVisibleDevice } = useAppSelector(
    (state) => state.devSlice
  );
  const isNotSkip = isPeriod && isVisibleDevice;

  const {
    data: sessions,
    isError,
    isLoading,
    isSuccess,
  } = useGetSelectedDevSessionByPeriodQuery(
    {
      dev_number: selectedDev?.number,
      sess_period_start: values.sess_period_start,
      sess_period_end: values.sess_period_end,
    },
    { skip: !isNotSkip }
  );

  const setPeriod = (event: FormEvent) => {
    event.preventDefault();

    setIsPeriod(true);
  };

  useEffect(() => {
    // Если у пользователя есть права редактирования:
    if (auth && "user" in auth && auth?.user?.roles_ids.roles[1] === 2)
      setIsAdmin(true);
  }, [auth?.user]);
  console.log("selelectedDev", selectedDev);
  return (
    <SessonsTabView
      errors={errors}
      handleChange={handleChange}
      handleSubmit={setPeriod}
      isValid={isValid}
      sessions={sessions?.data}
      isAdmin={isAdmin}
      device={selectedDev}
      isLoadingGetSessions={isLoading}
      isSuccessGetSession={isSuccess}
      isErrorGetSession={isError}
    />
  );
};
