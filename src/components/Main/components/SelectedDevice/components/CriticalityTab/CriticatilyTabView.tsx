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

import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import { IDev } from "@src/types/IDev";

import { useStyles } from "@hooks/useStyles";
import styles from "./styles.module.scss";

interface Props {
  selectedDev: IDev;
}
export const CriticatilyTabView: FC<Props> = ({ selectedDev }) => {
  const cx = useStyles(styles);
  const {
    sensors: { s: sensorsValues },
    control_sess,
    last_sess,
  } = selectedDev;
  return (
    <>
      {last_sess ? (
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
                  <TableCell align="center">Контрольная сессия</TableCell>
                  <TableCell align="center">Последняя сессия</TableCell>
                  <TableCell align="center">Критичность</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sensorsValues.map((sensor, i) => {
                  let diff = 0;
                  if (control_sess && last_sess) {
                    diff = Math.abs(
                      Number(JSON.parse(control_sess.sess_data).s[i].data) -
                        Number(JSON.parse(last_sess.sess_data).s[i].data)
                    );
                  }

                  return (
                    <TableRow key={i}>
                      <TableCell align="center">{sensor.depth}</TableCell>
                      {control_sess ? (
                        <TableCell align="center">
                          {JSON.parse(control_sess.sess_data).s[i].data}
                        </TableCell>
                      ) : (
                        <>
                          {last_sess ? (
                            <TableCell align="center">
                              {JSON.parse(last_sess.sess_data).s[i].data}
                            </TableCell>
                          ) : (
                            <TableCell align="center">Нет данных</TableCell>
                          )}
                        </>
                      )}
                      {last_sess ? (
                        <TableCell align="center">
                          {" "}
                          {JSON.parse(last_sess.sess_data).s[i].data}
                        </TableCell>
                      ) : (
                        <TableCell align="center">Нет данных</TableCell>
                      )}
                      <TableCell align="center">
                        {last_sess && (
                          <>
                            {diff < 3 ? (
                              <CheckIcon
                                sx={{ fontSize: "small", color: "green" }}
                              />
                            ) : (
                              <CloseIcon
                                sx={{ fontSize: "small", color: "red" }}
                              />
                            )}
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      ) : (
        <p className={cx("notfound")}>Нет сессий на устройстве</p>
      )}
    </>
  );
};
