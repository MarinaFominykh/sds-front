import { FC } from "react";

import { useStyles } from "@hooks/useStyles";

import styles from "./styles.module.scss";

interface Props {
  data: any;
}
export const TablePreview: FC<Props> = ({ data }) => {
  const cx = useStyles(styles);
  return (
    <table>
      <thead>
        <tr>
          {data.cols.map((col: any) => (
            <th className={cx("head-cell")} key={col.key}>
              {col.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row: any, i: number) => (
          <tr className={cx("cell")} key={i}>
            {row.map((cell: any, iCell: any) => (
              <td key={iCell}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    // <Table>
    //   <TableHead>
    //     <TableRow>
    //       {data.cols.map((col) => {
    //         return <TableCell key={col.key}>{col.name}</TableCell>;
    //       })}
    //     </TableRow>
    //   </TableHead>
    //   <TableBody>
    //     {data.rows.map((row, i) => {
    //       return (
    //         <TableRow key={i}>
    //           {row.map((cell, index) => (
    //             <TableCell key={index}>{cell}</TableCell>
    //           ))}
    //         </TableRow>
    //       );
    //     })}
    //   </TableBody>
    // </Table>
  );
};
