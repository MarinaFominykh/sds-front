import { Box, Typography } from "@mui/material";
import { FunctionComponent } from "react";

import ShowChartIcon from "@mui/icons-material/ShowChart";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";

export const CustomizedLabel1: FunctionComponent<any> = (props: any) => {
  const { x, y, value } = props;

  if (Number(1.44) >= Number(value)) {
    return (
      <text
        x={x + 50}
        y={y}
        dy={-4}
        fill={"#FF0404"}
        fontSize={10}
        color={"red"}
        textAnchor="middle"
      >
        {value} Критично
      </text>
    );
  }
};

export const CustomizedGroupTick = (props: any) => {
  const { x, y, payload } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        className="map"
        width="4"
        height="8"
        fill="#808080"
        fontFamily="Verdana"
        fontSize="14px"
      />
      <text
        dx={x - 35}
        dy={y + 10}
        fill="blue"
        fontSize="12px"
        textAnchor="middle"
      >
        {payload.value}
      </text>
    </g>
  );
};

export const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <>
        <Box
          sx={{
            background: "#fff",
            p: "4px",
            borderRadius: " 4px",
            boxShadow: "0px 1px 8px 0px rgba(15, 134, 225, 0.2)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyItems: "center",
              alignItems: "center",
            }}
          >
            <ShowChartIcon sx={{ color: "#FFAD4E", fontSize: "14px" }} />
            <Typography sx={{ color: "#808080", fontSize: "14px", mr: "2px" }}>
              Глубина:&nbsp;
            </Typography>
            <Typography sx={{ color: "#266BF1", fontSize: "14px" }}>
              {" "}
              {`${label}`}{" "}
            </Typography>
          </Box>

          {payload && payload[0] && !payload[1] && !payload[2] && (
            <Box
              sx={{
                display: "flex",
                justifyItems: "center",
                alignItems: "center",
              }}
            >
              <DeviceThermostatIcon
                sx={{ color: "#8884d8", fontSize: "14px" }}
              />
              <Typography
                sx={{ color: "#808080", fontSize: "14px", mr: "2px" }}
              >
                Температура:&nbsp;
              </Typography>
              <Typography sx={{ color: "#8884d8", fontSize: "14px" }}>
                {" "}
                {`${payload[0].value}`}{" "}
              </Typography>
            </Box>
          )}
          {payload && payload[1] && !payload[2] && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <DeviceThermostatIcon
                  sx={{ color: "#8884d8", fontSize: "14px" }}
                />
                <Typography
                  sx={{ color: "#808080", fontSize: "14px", mr: "2px" }}
                >
                  Температура:&nbsp;
                </Typography>
                <Typography sx={{ color: "#8884d8", fontSize: "14px" }}>
                  {" "}
                  {`${payload[1].value}`}{" "}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <DeviceThermostatIcon
                  sx={{ color: "#82ca9d", fontSize: "14px" }}
                />

                <Typography
                  sx={{ color: "#808080", fontSize: "14px", mr: "14px" }}
                >
                  Температура:&nbsp;
                </Typography>
                <Typography sx={{ color: "#82ca9d", fontSize: "14px" }}>
                  {`${payload[0].value}`}{" "}
                </Typography>
              </Box>
            </>
          )}

          {payload && payload[2] && (
            <>
              <Box
                sx={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <DeviceThermostatIcon
                  sx={{ color: "#8884d8", fontSize: "14px" }}
                />
                <Typography
                  sx={{ color: "#808080", fontSize: "14px", mr: "2px" }}
                >
                  Температура:&nbsp;
                </Typography>
                <Typography sx={{ color: "#8884d8", fontSize: "14px" }}>
                  {`${payload[2].value}`}{" "}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <DeviceThermostatIcon
                  sx={{ color: "#82ca9d", fontSize: "14px" }}
                />

                <Typography
                  sx={{ color: "#808080", fontSize: "14px", mr: "14px" }}
                >
                  Температура:&nbsp;
                </Typography>
                <Typography sx={{ color: "#82ca9d", fontSize: "14px" }}>
                  {`${payload[1].value}`}{" "}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyItems: "center",
                  alignItems: "center",
                }}
              >
                <DeviceThermostatIcon
                  sx={{ color: "#FE6F4F", fontSize: "14px" }}
                />
                <Typography
                  sx={{ color: "#808080", fontSize: "14px", mr: "14px" }}
                >
                  Температура:&nbsp;
                </Typography>
                <Typography sx={{ color: "#FE6F4F", fontSize: "14px" }}>
                  {`${payload[0].value}`}{" "}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </>
    );
  }
  return null;
};
