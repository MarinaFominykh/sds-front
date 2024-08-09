import { IOrg } from "./IOrg";

export interface IJob {
  id: string;
  name: string;
  id_org?: string;
  org_id?: string;
  info: string;
}

export interface ISelectedJob {
  id: string;
  name: string;
  org_id: string;
  info: string;
  org: IOrg;
}
