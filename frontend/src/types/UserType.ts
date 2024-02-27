import { PaginationParams, QueryParams } from "./CommonType";

export type AuthorityType = {
  name: string;
};

export type UserType = {
  id: number;
  createdDate: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  activated: boolean;
  imageUrl: string;
  authorities: AuthorityType[];
};

export type UserStateTypes = {
  users: Array<UserType> | null;
  filters: QueryParams;
  pagination: PaginationParams;
  messageError: string | null;
};
