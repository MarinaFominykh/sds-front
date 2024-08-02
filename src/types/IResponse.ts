export interface IResponse {
  cmd: string /* команда запроса */;
  error: string | null /* ошибка */;
  //#TODO: Добавить тип:
  data: any /* строки из запроса */;
  user_sess_code: string /* дополнительный код ответа */;
}

/**
 * Класс ответа с сервера (WebSocket)
 */
// export class WSResult implements IResponse {
//   cmd: string = ""; /* команда запроса */
//   error: string | null = null; /* ошибка */
//   data: any = null; /* строки из запроса */
//   code: string = ""; /* дополнительный код ответа */
//   constructor(_cmd?: string) {
//     this.cmd = _cmd || "";
//     this.data = new Array();
//     this.code = "";
//   }
// }
