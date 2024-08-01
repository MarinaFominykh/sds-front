import { IQuery } from "@src/types/IQuery";
import { ECOMMAND } from "@src/types/ECommand";

type TArgs = {
  //[key: string]: string | number | boolean;
  [key: string]: string | number | boolean;
};
export const createBodyQuery = (command: ECOMMAND, args: TArgs | TArgs[]) => {
  const code = JSON.parse(localStorage.getItem("code") || "");
  const query: IQuery = {
    cmd: command,
    sess_code: code,
    args,
  };

  return query;
};

export const containsText = (text: string, searchText: string) =>
  text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
export const getDigitalStr = (str: string) => {
  return str.replace(/[^\d\.,]/g, "").replace(/,/g, ".");
};
