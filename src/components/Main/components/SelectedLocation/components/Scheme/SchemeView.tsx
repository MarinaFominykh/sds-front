import { FC } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  isLoading: boolean;
  svg: string;
}
export const SchemeView: FC<Props> = ({ isLoading, svg }) => {
  const cx = useStyles(styles);
  return (
    <>
      {isLoading ? (
        <CircularProgress color="secondary" />
      ) : (
        <div className={cx("container")}>
          <Box
            className="svg-container"
            dangerouslySetInnerHTML={{
              __html: svg,
            }}
            //ref={svgRef}
            sx={{
              borderRadius: "4px",

              background: "#fff",
              display: "flex",
              padding: "8px",
              pl: "22px",
              mb: "22px",
            }}
          ></Box>
          <Box id="tooltip" sx={{ position: "absolute", display: "none" }}>
            <Typography
              sx={{ fontSize: "12px", fontWeight: "700" }}
              className="tooltip__well"
            ></Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: "700" }}
              className="tooltip__dev"
            ></Typography>
          </Box>
        </div>
      )}
    </>
  );
};
