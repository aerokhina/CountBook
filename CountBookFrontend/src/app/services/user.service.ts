import { Injectable } from '@angular/core';
import {HttpAuthService} from "../account/core/http-auth.service";
import {Category} from "./category";
import {User, UserChangePassword} from "./user";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpAuthService) { }

  getUser() {
    return this.http.get<User>("user/getprofile/");
  }

  editProfile(user: User){
    return this.http.post<User>("user/editprofile/", user);
  }

  changePassword(changePassword: UserChangePassword){
    return this.http.post<UserChangePassword>("user/changepassword/", changePassword);
  }
}
