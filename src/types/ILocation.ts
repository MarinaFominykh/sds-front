import { IDev } from "./IDev";
import { IOrg } from "./IOrg";
import { IWell } from "./IWell";

export interface ILocation {
  id?: string | undefined;
  parent_id?: string | undefined;
  g_name?: string | undefined;
  latitude?: string | undefined;
  longitude?: string | undefined;
  ord_num?: number | undefined;
  org_id?: string | undefined;
  id_org?: string | undefined;
  g_info?: string | undefined;
  deleted?: boolean | undefined;
  subLocations: ILocation[];
  devs?: IDev[];
  wells: IWell[];
  org?: IOrg;
  svg?: string | undefined;
}
