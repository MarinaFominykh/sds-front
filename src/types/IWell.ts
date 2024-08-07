import { IDev } from "./IDev";
import { ILocation } from "./ILocation";
import { IOrg } from "./IOrg";

export interface IWell {
  id: string;
  number: string;
  org_id: string;
  group_id: string;
  dev_id: string;
}

export interface ISelectedWell {
  id: string;
  number: string;
  org: IOrg;
  location: ILocation;
  device: IDev;
}
