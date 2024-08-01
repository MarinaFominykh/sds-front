export interface IQuery {
  cmd: string /* команда запроса */;
  args:
    | {
        [key: string]: string | number | boolean;
      }
    | {
        [key: string]: string | number | boolean;
      }[] /* аргументы запроса { "arg1":"agr1_value", .... } */;
  sess_code: string /* код сессии чтобы проверять пользователя */;
}

/**
 * Класс запроса на сервер
 */
export class Query implements IQuery {
  cmd = "";
  args: any = {};
  sess_code: string = "";
  constructor(_cmd?: string, _args?: any, _sess_code?: string) {
    this.cmd = _cmd || "";
    this.args = _args || {};
    this.sess_code = _sess_code || "";
  }
}
