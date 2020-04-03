export interface UserProfileModel{
  name: string;
  email: string;
  userGroupName: string;
  userGroupId: number;
}

export interface UserEditModel{
  name: string;
  email: string;
  userGroupId: number;
}

export interface UserChangePassword{
  oldPassword: string;
  newPassword: string;
}
