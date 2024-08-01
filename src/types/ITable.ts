export interface ITable {
  rows: (string | number)[][];
  cols: { name: string; key: number | null }[];
}

export class Table implements ITable {
  rows = [];
  cols = [{ name: "", key: null }];
}
