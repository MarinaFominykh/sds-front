import { FormEvent, useState, useMemo, useEffect, FC } from "react";
import { NewDevsView } from "./NewDevsView";
import { useAppSelector } from "@hooks/redux";
import { useCreateDevsMutation } from "@src/redux/services/devsApi";
import { getDigitalStr } from "@src/utils/functions";

interface Props {
  handleClose: () => void;
}

export const NewDevs: FC<Props> = ({ handleClose }) => {
  const [message, setMessage] = useState("");
  const [inValidDevs, setInvalidDevs] = useState<string[]>([]);
  const [validDevs, setValidDevs] = useState<string[]>([]);
  const [duplicatesDevs, setDuplicatesDevs] = useState<string[]>([]);
  const { newDevsTable } = useAppSelector((state) => state.devSlice);
  const { devs } = useAppSelector((state) => state.devSlice);
  const { selectedLocation } = useAppSelector((state) => state.locationSlice);
  const [createDevs, { isError, isLoading, isSuccess }] =
    useCreateDevsMutation();

  const numbersDevs = useMemo(() => devs.map(({ number }) => number), [devs]);

  const validationAndGeneratedArgs = (event: FormEvent) => {
    event.preventDefault();
    let m1: any;
    let array_senssors;
    let array_number: any;
    let lat: string;
    let lng: string;
    let sess: string | number;
    const filterRows = newDevsTable?.rows.filter((row) => {
      const isValid = () => {
        return (
          String(row[0]).trim() !== "" &&
          String(row[1]).trim() !== "" &&
          String(row[2]).trim() !== "" &&
          String(row[3]) !== "" &&
          String(row[4]) !== "" &&
          !Number.isNaN(Number(row[0])) &&
          !Number.isNaN(Number(row[2])) &&
          !Number.isNaN(Number(row[3])) &&
          !Number.isNaN(Number(row[4]))
        );
      };
      if (numbersDevs.includes(String(row[0]))) {
        setDuplicatesDevs([...duplicatesDevs, String(row[0])]);
      } else if (!isValid()) {
        setInvalidDevs([...inValidDevs, String(row[0])]);
      } else return row.length;
    });

    if (filterRows?.length) {
      const preventArgs = filterRows?.map((row) => {
        setValidDevs([...validDevs, String(row[0])]);
        m1 = row.slice(5);
        array_senssors = m1;
        array_number = array_senssors.filter(
          (el: any) => typeof el === "number"
        );
        let senssors = array_number.map((val: { toString: () => any }) => ({
          depth: val.toString(),
          value: 1,
        }));
        if (numbersDevs.includes(String(row[0]))) {
          setDuplicatesDevs([...duplicatesDevs, String(row[0])]);
        } else {
          setValidDevs([...validDevs, String(row[0])]);
        }
        if (Number(row[2] !== (1 || 7 || 14 || 31))) {
          sess = "1";
        } else {
          sess = row[2];
        }

        if (Number(row[3] !== 0) && Number(row[4] !== 0)) {
          let latchar = getDigitalStr(String(row[3]));
          let lngchar = getDigitalStr(String(row[4]));

          const removeExtraDots = (str: string) => {
            const firstDotIndex = str.indexOf(".");
            if (firstDotIndex !== 1) {
              const withoutDots =
                str.slice(0, firstDotIndex + 1) +
                str.slice(firstDotIndex + 1).replace(/\./g, "");
              return withoutDots;
            } else return str;
          };
          lat = removeExtraDots(latchar);
          lng = removeExtraDots(lngchar);

          if (
            lat.startsWith(".") ||
            lat.endsWith(".") ||
            lng.startsWith(".") ||
            lng.endsWith(".")
          ) {
            lat = "0.0";
            lng = "0.0";
          }
        } else if (Number(row[3] === 0) && Number(row[4] === 0)) {
          lat = "0.0";
          lng = "0.0";
        } else throw new Error("Произошла неизвестная ошибка");

        return {
          group_dev_id: selectedLocation?.id ?? "",
          number: String(row[0]) || "",
          name: String(row[1]) || "",
          latitude: lat,
          longitude: lng,
          sensors: `{"s": ${JSON.stringify(senssors)}}`,
          deleted: false,
          info: "",
          period_sess: sess || "",
        };
      });
      const args = preventArgs.filter((item) => item !== undefined);

      if (args.length) createNewDevs(args);
    }
  };

  const createNewDevs = (args: any) => {
    createDevs(args).then((res) => {
      if ("data" in res && "error" in res?.data) {
        const {
          data: { error },
        } = res;
        if (error) {
          setMessage(error);
        }
      }
    });
  };
  useEffect(() => {
    if (isSuccess && inValidDevs.length === 0 && duplicatesDevs.length === 0) {
      setTimeout(() => {
        handleClose();
      }, 2000);
    }
  }, [isSuccess]);
  return (
    <form onSubmit={validationAndGeneratedArgs}>
      <NewDevsView
        message={message}
        validDevsNumbers={validDevs}
        inValidDevsNumbers={inValidDevs}
        duplicatesDevsNumbers={duplicatesDevs}
        isErrorSave={isError}
        isLoading={isLoading}
        isSuccessSave={isSuccess}
      />
    </form>
  );
};
