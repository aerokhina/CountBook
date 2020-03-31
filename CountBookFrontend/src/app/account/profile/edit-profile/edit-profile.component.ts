import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../account.service";
import {User} from "../../../services/user";
import {UserService} from "../../../services/user.service";
import {validateAllFormFields} from "../../../../core/validation";
import {CreateRecordModel} from "../../../services/record";
import {formatNgbDateISO} from "../../../utils/date-utils";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  form: FormGroup;
  user: User;

  constructor(private fb: FormBuilder,
              private readonly accountService: AccountService,
              private userService: UserService,
              private router: Router) {
  }

  get name() {
    return this.form.controls.name;
  }

  get email() {
    return this.form.controls.email;
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.userService.getUser().subscribe(item => {
      this.name.setValue(item.name);
      this.email.setValue(item.email);
    });
  }

  onSubmit() {
    validateAllFormFields(this.form);
    if (!this.form.valid) {
      return;
    }

    const userData: User = {
      name: this.name.value,
      email: this.email.value
    };

    this.userService.editProfile(userData).subscribe(() => {
      return this.router.navigate(["/", "profile"]);
    })
  }
}
