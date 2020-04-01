import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../services/user";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: User = {
    name: "",
    email: ""
  };

  constructor(
    private userService: UserService,
    private readonly accountService: AccountService
  ) {
  }

  ngOnInit() {
    this.userService.getUser().subscribe(item => {
      this.user = item;
    });
  }

  logout() {
    this.accountService.logout();
  }

}
