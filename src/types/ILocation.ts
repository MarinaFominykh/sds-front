import { IDev } from "./IDev";

export interface ILocation {
  id: string;
  parent_id: string;
  g_name: string;
  latitude: string;
  longitude: string;
  ord_num?: number;
  org_id: string;
  g_info: string;
  deleted: boolean;
  subLocations?: ILocation[];
  devs?: IDev[];
}
