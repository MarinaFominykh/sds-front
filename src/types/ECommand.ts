export enum ECOMMAND {
  //-----------------------------Авторизация
  // Авторизация по логину и паролю
  GETUSERBYLOGIN = "get_UserByAuth",
  //Авторизация по коду сессии
  GETUSERBYSESSCODE = "get_UserBySessionCode",

  //-------------------------------Организация
  // Получение организации авторизованного пользователя
  GETORG = "get_Org",
  //Добавление огранизации
  SETORG = "set_Org",
  //Обновление организации
  CHANGEORG = "set_ChangeOrg",

  //-------------------------------Должность
  // Получение должности авторизованного пользователя
  GETJOB = "get_Job",
  // Добавление должности
  SETJOB = "set_Job",
  // Обновление должности
  CHAHGEJOB = "set_ChangeJob",

  //--------------------------------Пользователь
  //Добавление пользователя
  SETUSER = "set_User",
  // Изменение данных пользователя
  CHANGEUSER = "set_UpdateUserData",

  //--------------------------------Пользователи
  GETUSERS = "get_AllUsers",

  //---------------------------------Группа устройств
  // Получение всех групп   устройств
  GETGROUPS = "get_AllDevsGroups",
  // Получение группы устройств по id родительской группы
  GETGROUPSBYPARENTID = "get_DevsGroups",
  // Добавление группы
  SETGROUP = "set_DevsGroups",
  //Редактирование группы
  CHANGEGROUP = "set_UpdateDevsGroups",

  //---------------------------------Схема группы
  //Получение схемы, если она имеется
  GETSCHEME = "get_SchemeSvg",
  //Добавление/обновление схемы SVG группы
  CHANGESCHEME = "set_SchemeSvg",

  //---------------------------------Устройства
  //Получение устройств по id группы
  GETDEVSBYLOCATIONID = "get_Devs",
  //Получение всех устройство
  GETALLDEVS = "get_AllDevs",

  //Добавление устройств
  SETDEVS = "set_Devs",
  //Редактирование устройств
  CHANGEDEV = "set_ChangeDevs",

  //---------------------------------Сессии
  //Получение последней переданной сессии для отображение цвета маркера
  GETLASTSESS = "get_LastDevSess",
  //Получение последних сессий всех устройств
  GETALLLASTSESS = "get_AllLastDevSess",
  //Получение контрольной сессии установленной ранее администратором
  GETCONTOLSESS = "get_ControlDevSess",
  // Установка контрольной сессии
  SETCONTROLSESS = "set_ControlDevSess",
  //Удаление контрольной сессии
  DELETECONTROLSESS = "set_deleteControlDevSess",
}
