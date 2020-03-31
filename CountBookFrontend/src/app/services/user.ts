export interface User{
  name: string;
  email: string;
}

export interface UserChangePassword{
  oldPassword: string;
  newPassword: string;
}
