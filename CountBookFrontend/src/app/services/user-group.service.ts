import {Injectable} from '@angular/core';
import {HttpAuthService} from "../account/core/http-auth.service";
import {CreateUserGroupModel, UserGroupModel} from "./user-group";

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(private http: HttpAuthService) {
  }

  getGroups() {
    return this.http.get<UserGroupModel[]>("usergroup/getlist");
  }

  addGroup(item: CreateUserGroupModel) {
    return this.http.post<UserGroupModel>("usergroup/create", item);
  }
}
