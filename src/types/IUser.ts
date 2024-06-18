export interface IUser {
  id: string;
  login: string;
  password: string;
  family: string;
  name: string;
  father: string;
  telephone: string;
  email: string;
  org_id?: string;
  id_org?: string;
  job_title_id: string;
  roles_ids: { roles: number[] };
  user_data: Object;
  mail_code: string;
  act_mail: boolean;
  re_password_code: string;
  deleted: boolean;
  deleted_date: Date;
  created_at: Date;
  info: string;
}

export interface IUserCreate {
  login: string;
  password: string;
  family: string;
  name: string;
  father: string;
  email: string;
  id_org: string;
  id_jobs: string;
  user_r: boolean;
  user_w: boolean;
  info: string;
}

export interface IUserUpdate {
  id: number;
  isAdmin: boolean;
  family: string;
  name: string;
  father: string;
  password: string;
  email: string;
  info: string;
  deleted: boolean;
}
