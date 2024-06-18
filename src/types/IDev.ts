export interface IDev {
  id: string;
  group_dev_id: string;
  number: string;
  name: string;
  latitude: string;
  longitude: string;
  deleted: boolean;
  info: string;
  perios_sess: string;
  sensors: ISensor[];
}

interface ISensor {
  depth: number;
  value: number;
}
