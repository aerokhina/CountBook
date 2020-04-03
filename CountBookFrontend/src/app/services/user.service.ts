import { Injectable } from '@angular/core';
import {HttpAuthService} from "../account/core/http-auth.service";
import {UserChangePassword, UserEditModel, UserProfileModel} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpAuthService) { }

  getUser() {
    return this.http.get<UserProfileModel>("user/getprofile/");
  }

  editProfile(user: UserEditModel){
    return this.http.post<UserEditModel>("user/editprofile/", user);
  }

  changePassword(changePassword: UserChangePassword){
    return this.http.post<UserChangePassword>("user/changepassword/", changePassword);
  }
}
