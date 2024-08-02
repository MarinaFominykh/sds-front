import { FC } from "react";
import {
  TableCell,
  Table,
  TableRow,
  TableBody,
  TableHead,
} from "@mui/material";
import { ISession } from "@src/types/ISession";
import { IDev } from "@src/types/IDev";
import moment from "moment";

interface Props {
  sessions: ISession[];
  selectedDev: IDev | null;
}
export const ExportExelTableSessions: FC<Props> = ({
  sessions,
  selectedDev,
}) => {
  return (
    <>
      {sessions?.length > 0 && (
        <Table id="sessions-exel" sx={{ display: "none" }}>
          <TableHead>
            <TableRow>
              <TableCell>Устройство</TableCell>
              <TableCell>Время устройства</TableCell>
              <TableCell>Время сервера</TableCell>
              <TableCell>АКБ</TableCell>
              {selectedDev?.sensors?.s.map((sensor, i) => {
                return <TableCell key={i}>{sensor.depth}</TableCell>;
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map((session) => {
              return (
                <TableRow key={session.id}>
                  <TableCell>{session.dev_number}</TableCell>
                  <TableCell>
                    {moment(session.time_dev).format("DD.MM.YYYY hh:mm")}
                  </TableCell>
                  <TableCell>
                    {moment(session.time_srv).format("DD.MM.YYYY hh:mm")}
                  </TableCell>
                  <TableCell>{session.level_akb}</TableCell>

                  {JSON.parse(session.sess_data).s.map(
                    (value: { depth: string; data: string }, idx: number) => (
                      <TableCell key={idx}>{value.data}</TableCell>
                    )
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </>
  );
};
