import { AuthorityType, UserType } from ".";

export type CreateUserAccountStateType = {
  create: UserType | null; // this is api respone data
  messageError: string | null;
};

export type CreateUserAccountRequestType = {
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  imageUrl: string | "";
  createdDate: string | "";
  authorities: AuthorityType[];
};

export type CreateUserAccountSucessType = { create: UserType };
