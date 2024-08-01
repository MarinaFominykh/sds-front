import { ISession } from "./ISession";
export interface IDev {
  id: string;
  group_dev_id: string;
  number: string;
  name: string;
  latitude: string;
  longitude: string;
  deleted: boolean;
  info: string;
  period_sess: string;
  sensors: {
    s: ISensor[];
  };
  time: Date | undefined;
  control_sess?: ISession;
  last_sess?: ISession;
  selectedSession?: ISession;
}

export interface ISensor {
  depth: number;
  value: number;
}
