import { UserType } from ".";

export type SettingStateType = {
  user: UserType | null; // this is api respone data
  messageError: string | null;
};

export type UpdateUserRequestType = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  imageUrl: string;
};

export type UpdatePasswordRequestType = {
  userId: number | string;
  newPassword: string;
  oldPassword: string;
};

export type UpdateSucessType = {
  user: UserType;
};
