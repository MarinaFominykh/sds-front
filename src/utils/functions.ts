import { IQuery } from "@src/types/IQuery";
import { ECOMMAND } from "@src/types/ECommand";

export const createBodyQuery = (command: ECOMMAND, args: object) => {
  const code = JSON.parse(localStorage.getItem("code") || "");
  const query: IQuery = {
    cmd: command,
    sess_code: code,
    args,
  };

  return query;
};
