export interface User{
  name: string;
  email: string;
}

export interface UserChangePassword{
  id: number;
  oldPassword: string;
}
