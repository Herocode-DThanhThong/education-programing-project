import { AuthorityType } from "./UserType";

export type AuthStateTypes = {
  idUser: number | null;
  isLoggedIn: boolean | null;
  isAdmin: boolean | null;
  userName: string | null;
  accessToken: string | null;
  authorities: AuthorityType[];
  messageError: string | null;
};

export type LoginRequestType = {
  userName: string;
  password: string;
};

export type LoginSuccessType = {
  id: string;
  userName: string;
  accessToken: string;
  authorities: AuthorityType[];
};
