import { IQuery } from "@src/types/IQuery";
import { ECOMMAND } from "@src/types/ECommand";
import { ILocation } from "@src/types/ILocation";
import { IOrg } from "@src/types/IOrg";

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
  text?.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
export const getDigitalStr = (str: string) => {
  return str.replace(/[^\d\.,]/g, "").replace(/,/g, ".");
};

// Options для списка с расположением
export const getLocOptions = (locations: ILocation[]) => {
  let allLocations: any[] = [];
  const recursion = (arr: ILocation[]) => {
    arr.forEach((item) => {
      if (item.subLocations?.length > 0) {
        recursion(item.subLocations);
      }

      allLocations = [
        ...allLocations,
        {
          id: item.id,
          g_name: item.g_name,
          parent_id: item.parent_id,
          org_id: item.org_id,
        },
      ];
    });
    // const groups = arr.reduce((acc, { group: { g_name, id } }) => {
    //   return [...acc, { id, name: g_name }];
    // }, []);
    // setGroup(groups);
  };
  recursion(locations);

  return allLocations.reverse();
};

export function isInnInArray<T extends keyof IOrg>(
  orgs: IOrg[],
  value: string,
  field: T
) {
  return orgs.some((org) => org[field] === value);
}
