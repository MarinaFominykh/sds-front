import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import CrisisAlertIcon from "@mui/icons-material/CrisisAlert";

interface IProps {
  isVisible: boolean;
  isAdmin: boolean;
}

export const InfoStickerView: FC<IProps> = ({ isVisible, isAdmin }) => {
  return (
    <>
      {isVisible ? (
        <Stack
          spacing={2}
          sx={{
            background: "#FFF",
            padding: "12px",
            borderRadius: "4px",
          }}
        >
          <PeriodWindowInitial />
          <PeriodWindowRed />
          <PeriodWindowOrange />
          <PeriodWindowYellow />
          <PeriodWindowGreen />
          {isAdmin && <PeriodWindowBlocked />}
        </Stack>
      ) : null}
    </>
  );
};
export const PeriodWindowGreen = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        background: "#FFF",

        borderRadius: "4px",
      }}
    >
      <CrisisAlertIcon fontSize="small" sx={{ color: "#0FA958" }} />
      <Typography sx={{ color: "#000", fontSize: "12px" }}>
        {" "}
        Передача данных не пропущена
      </Typography>
    </Stack>
  );
};

export const PeriodWindowRed = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        background: "#FFF",

        borderRadius: "4px",
      }}
    >
      <CrisisAlertIcon fontSize="small" sx={{ color: "#EA4335" }} />
      <Typography sx={{ color: "#000", fontSize: "12px" }}>
        {" "}
        Пропущено 3 или больше передачи данных
      </Typography>
    </Stack>
  );
};
export const PeriodWindowYellow = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        background: "#fff",

        borderRadius: "4px",
      }}
    >
      <CrisisAlertIcon fontSize="small" sx={{ color: "#FBBC05" }} />
      <Typography sx={{ color: "#000", fontSize: "12px" }}>
        {" "}
        Пропущена 1 передача данных
      </Typography>
    </Stack>
  );
};
export const PeriodWindowOrange = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        background: "#fff",

        borderRadius: "4px",
      }}
    >
      <CrisisAlertIcon fontSize="small" sx={{ color: "#FC8904" }} />
      <Typography sx={{ color: "#000", fontSize: "12px" }}>
        {" "}
        Пропущено 2 передачи данных
      </Typography>
    </Stack>
  );
};

export const PeriodWindowInitial = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        background: "#FFF",

        borderRadius: "4px",
      }}
    >
      <Box sx={{ display: "flex", gap: "4px" }}>
        <CrisisAlertIcon fontSize="small" sx={{ color: "#EA4335" }} />
        <Typography sx={{ color: "#EA4335", fontSize: "12px", margin: "0px" }}>
          1119
        </Typography>
      </Box>

      <Typography sx={{ color: "#000", fontSize: "12px" }}>
        {" "}
        Данные по устройству ещё не переданы
      </Typography>
    </Stack>
  );
};

export const PeriodWindowBlocked = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      alignItems="center"
      sx={{
        background: "#FFF",

        borderRadius: "4px",
      }}
    >
      <CrisisAlertIcon fontSize="small" sx={{ color: "#808080" }} />
      <Typography sx={{ color: "#000", fontSize: "12px" }}>
        {" "}
        Устройство заблокировано
      </Typography>
    </Stack>
  );
};
