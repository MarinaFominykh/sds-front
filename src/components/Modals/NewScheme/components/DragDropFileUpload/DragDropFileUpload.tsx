import React, { useCallback, useState, ChangeEvent } from "react";
import {
  Box,
  Paper,
  IconButton,
  CircularProgress,
  Stack,
  Alert,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Typography } from "@components/_shared/Typography";
import { Button } from "@components/_shared/Button";
import { setNewScheme } from "@src/redux/reducers/locationSlice";
import { useAppDispatch } from "@hooks/redux";
import { useStyles } from "@hooks/useStyles";
import { SAVE_ERROR, SAVE_SUCCESS } from "@src/utils/messages";
import styles from "./styles.module.scss";

interface DragDropFileUploadProps {
  message: string;
  isSuccessSave: boolean;
  isErrorSave: boolean;
}

export const DragDropFileUpload: React.FC<DragDropFileUploadProps> = ({
  message,
  isErrorSave,
  isSuccessSave,
}) => {
  const cx = useStyles(styles);
  const dispatch = useAppDispatch();
  //const { setValues, values } = useFormValidation();
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
    const reader = new FileReader();
    reader.onloadend = () => {
      setLoading(false);

      setFileName(file.name);
      setFileSize(`${(file.size / 1024).toFixed(1)} KB`);
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
        dispatch(setNewScheme(reader.result));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      if (files && files[0]) {
        handleFileChange(files[0]);
        setIsDisabled(false);
      }
    },
    [handleFileChange]
  );

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
            accept=".svg"
            style={{ display: "none" }}
            id="raised-button-file"
            multiple
            type="file"
            onChange={handleChange}
          />
          <label htmlFor="raised-button-file">
            <Box display="flex" flexDirection="column" alignItems="center">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <CloudUploadIcon style={{ fontSize: 60 }} />
              </IconButton>
              <Typography>
                Перетащите файлы сюда или нажмите, чтобы выбрать файлы
              </Typography>
            </Box>
          </label>

          {loading && <CircularProgress size={24} className={cx("loader")} />}
        </Paper>
        {imagePreview && (
          <Stack className={cx("preview")}>
            <Typography>Предварительный просмотр</Typography>

            <Box
              component="img"
              src={imagePreview}
              alt={fileName || ""}
              sx={{ width: "50%", height: "auto" }}
            />
          </Stack>
        )}
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
        <Button disabled={isDisabled}>Сохранить</Button>
      </div>
    </>
  );
};
