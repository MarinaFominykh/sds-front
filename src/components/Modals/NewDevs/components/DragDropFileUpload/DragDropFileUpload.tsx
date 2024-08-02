import React, { useCallback, useState, ChangeEvent } from "react";
import { ExcelRenderer } from "react-excel-renderer";

import {
  Box,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { writeFile, utils } from "xlsx";

import { Typography } from "@components/_shared/Typography";
import { Button } from "@components/_shared/Button";
import { ExelSvg } from "../ExelSvg";

import { setNewDevsTable } from "@src/redux/reducers/devSlice";
import { useAppDispatch } from "@hooks/redux";
import { useStyles } from "@hooks/useStyles";
import { SAVE_ERROR, INVALID_TYPE_ERROR } from "@src/utils/messages";
import styles from "./styles.module.scss";
import { ITable } from "@src/types/ITable";

interface DragDropFileUploadProps {
  message: string;
  validDevsNumbers: string[];
  inValidDevsNumbers: string[];
  duplicatesDevsNumbers: string[];
  isSuccessSave: boolean;
  isErrorSave: boolean;
  isLoading: boolean;
}

export const DragDropFileUpload: React.FC<DragDropFileUploadProps> = ({
  message,
  validDevsNumbers,
  inValidDevsNumbers,
  duplicatesDevsNumbers,
  isErrorSave,
  isSuccessSave,
  isLoading,
}) => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  //const { setValues, values } = useFormValidation();
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  //const [table, setTable] = useState<Table | null>(null);
  const [errorTypeFileMessage, setErrorTypeFileMessage] = useState("");
  //const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleExportExel = () => {
    const table_elt = document.getElementById("file_template");
    const workbook = utils.table_to_book(table_elt);
    writeFile(workbook, "file_template.xlsx");
  };
  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(true);
    },
    []
  );

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);
    },
    []
  );

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange(files[0]);
    }
  }, []);

  const handleFileChange = (file: File) => {
    setLoading(true);
    setErrorTypeFileMessage("");

    if (
      file.type === "application/vnd.ms-excel" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ) {
      setFileName(file.name);
      setFileSize(`${(file.size / 1024).toFixed(1)} KB`);
      ExcelRenderer(file, (err: unknown, resp: ITable) => {
        if (err) {
          console.log(err);
        } else dispatch(setNewDevsTable(resp));
      });
    } else {
      setErrorTypeFileMessage(INVALID_TYPE_ERROR);
    }
    setLoading(false);
  };

  // const handleChange1 = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>) => {
  //     const files = event.target.files;

  //     if (files && files[0]) {
  //       handleFileChange(files[0]);
  //       setIsDisabled(false);
  //     }
  //   },
  //   [handleFileChange]
  // );
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        handleFileChange(file);
        setIsDisabled(false);
      }
    },
    [handleFileChange]
  );

  // const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   let fileObj = event.target.files?.[0];

  //   //just pass the fileObj as parameter
  //   ExcelRenderer(fileObj, (err, resp) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       setTable({
  //         cols: resp.cols,
  //         rows: resp.rows,
  //       });
  //     }
  //   });
  // };

  return (
    <>
      <Box>
        <Paper
          variant="outlined"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cx("paper")}
          style={{
            border: dragOver ? "2px dashed #000" : "2px dashed #aaa",

            background: dragOver ? "#eee" : "#fafafa",
          }}
        >
          <input
            accept=".xls, .xlsx"
            style={{ display: "none" }}
            id="input-exel-upload"
            multiple
            type="file"
            onChange={handleChange}
          />

          {/* <input
            type="file"
            onChange={fileHandler}
            style={{ padding: "10px" }}
          /> */}
          <label htmlFor="input-exel-upload">
            <Box display="flex" flexDirection="column" alignItems="center">
              <IconButton
                color="primary"
                //aria-label="upload picture"
                sx={{ width: "60px", height: "60px" }}
                component="span"
              >
                <ExelSvg />
              </IconButton>
              <Typography>
                Перетащите файлы сюда или нажмите, чтобы выбрать файлы
              </Typography>
            </Box>
          </label>

          {loading && <CircularProgress size={24} className={cx("loader")} />}
        </Paper>

        {/* TODO: Предварительный просмотр */}
        {/* {table?.cols && (
          <Stack className={cx("preview")}>
            <Typography>Предварительный просмотр</Typography>
            <TablePreview data={table} />

            <OutTable
              data={table.rows}
              columns={table.cols}
              tableClassName="ExcelTable2007"
              tableHeaderRowClass="heading"
            />
          </Stack>
        )} */}
        {fileName && (
          <div className={cx("devSheme-block")}>
            <div className={cx("devSheme-info")}>
              <span className={cx("devSheme-name")}>{fileName}</span> |{" "}
              <span className={cx("devSheme-size")}>{fileSize}</span>
            </div>
          </div>
        )}
      </Box>
      {message && (
        <Alert className={cx("alert")} severity="error">
          {message}
        </Alert>
      )}
      {errorTypeFileMessage && (
        <Alert className={cx("alert")} severity="error">
          {errorTypeFileMessage}
        </Alert>
      )}
      {isSuccessSave && (
        <Alert className={cx("alert")} severity="success">
          Устройства с номерами:&nbsp;
          {validDevsNumbers?.map((number) => `${number} `)}
          успешно добавлены
        </Alert>
      )}
      {isErrorSave && (
        <Alert className={cx("alert")} severity="error">
          {SAVE_ERROR}
        </Alert>
      )}
      {duplicatesDevsNumbers?.length !== 0 && (
        <Alert className={cx("alert")} severity="error">
          Устройства с номерами:&nbsp;
          {duplicatesDevsNumbers?.map((number) => `${number} `)}
          уже существуют и не будут добавлены
        </Alert>
      )}
      {inValidDevsNumbers?.length !== 0 && (
        <Alert className={cx("alert")} severity="error">
          Устройства с номерами:&nbsp;
          {inValidDevsNumbers?.map((number) => `${number}, `)}
          не соответствуют шаблону и не будут добавлены
        </Alert>
      )}
      <div className={cx("button")}>
        <Button onClick={handleExportExel} type="button">
          Скачать шаблон файла
        </Button>
        <Button disabled={isDisabled} isLoading={isLoading}>
          Сохранить
        </Button>
      </div>
      <Table key="my-table-id" id="file_template" sx={{ display: "none" }}>
        <TableBody key={"dsafsafasfd" + 8888}>
          <TableRow key={"dsafsafasfd" + 1}>
            <TableCell key="121212"> 300001 </TableCell>
            <TableCell key="12121ewe2"> 300001 - УПСВм (ТС №4)</TableCell>
            <TableCell key="121u"> 7</TableCell>
            <TableCell key="121weeew212"> 55.455900</TableCell>
            <TableCell key="121weeew21212">65.349242</TableCell>
            <TableCell key="qw1"> 0.1</TableCell>
            <TableCell key="qw2"> 0.2</TableCell>
            <TableCell key="qw3"> 0.3</TableCell>
            <TableCell key="qw4"> 0.4</TableCell>
            <TableCell key="qw5"> 0.5</TableCell>
            <TableCell key="qw6"> 0.6</TableCell>
            <TableCell key="qw7"> 0.7</TableCell>
          </TableRow>
          <TableRow key={"dsafssfd" + 1}>
            <TableCell key="12"> 300002 </TableCell>
            <TableCell key="1212"> 300002 - УПСВм (ТС №4)</TableCell>
            <TableCell key="121"> 31</TableCell>
            <TableCell key="12ew212"> 55.455900 </TableCell>
            <TableCell key="121wew21212"> 65.349242</TableCell>
            <TableCell key="1212eqe2"> 0.1</TableCell>
            <TableCell key="1e2eqe2"> 0.2</TableCell>
            <TableCell key="11e2eqe2"> 0.3</TableCell>
            <TableCell key="122eqe2"> 0.4</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};
