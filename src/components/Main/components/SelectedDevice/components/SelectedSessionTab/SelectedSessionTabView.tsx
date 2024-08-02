import { FC } from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import moment from "moment";
import { IDev } from "@src/types/IDev";
import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  selectedDev: IDev;
}
export const SelectedSessionTabView: FC<Props> = ({ selectedDev }) => {
  const cx = useStyles(styles);
  const {
    sensors: { s: sensorsValues },
    control_sess,
    last_sess,
    selectedSession,
  } = selectedDev;
  let controlSession = control_sess ?? last_sess;
  return (
    <div className={cx("container")}>
      {last_sess && controlSession && selectedSession && (
        <Paper
          style={{ maxHeight: 650, overflow: "auto", padding: "20px" }}
          className="paper_table"
          elevation={1}
        >
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Глубина</TableCell>
                  <TableCell align="center">
                    Контрольная сессия{" "}
                    {moment(controlSession.time_srv).format("DD.MM.YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    Последняя сессия{" "}
                    {moment(last_sess.time_srv).format("DD.MM.YYYY")}
                  </TableCell>
                  <TableCell align="center">
                    Выбранная сессия{" "}
                    {moment(selectedSession.time_srv).format("DD.MM.YYYY")}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sensorsValues.map((sensor, i) => {
                  return (
                    <TableRow key={i}>
                      <TableCell align="center">{sensor.depth}</TableCell>
                      <TableCell align="center" className={cx("cell-control")}>
                        {JSON.parse(controlSession.sess_data).s[i].data}
                      </TableCell>
                      <TableCell align="center" className={cx("cell-last")}>
                        {JSON.parse(last_sess.sess_data).s[i].data}
                      </TableCell>

                      <TableCell align="center" className={cx("cell-selected")}>
                        {JSON.parse(selectedSession.sess_data).s[i].data}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </div>
  );
};
