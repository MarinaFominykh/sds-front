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
  sensors: ISensor[];
  time: Date | undefined;
}

interface ISensor {
  depth: number;
  value: number;
}
