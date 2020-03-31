import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../account.service";
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";
import {UserChangePassword} from "../../../services/user";
import {validateAllFormFields} from "../../../../core/validation";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private readonly accountService: AccountService,
              private userService: UserService,
              private router: Router) {
  }

  get oldPassword() {
    return this.form.controls.oldPassword;
  }

  get newPassword() {
    return this.form.controls.newPassword;
  }

  get newPasswordConfirmation() {
    return this.form.controls.newPasswordConfirmation;
  }

  ngOnInit() {
    this.form = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      newPasswordConfirmation: ['', [Validators.required]]
    }, {
      validators: [this.passwordConfirming, this.passwordDiffer]
    });

  }

  passwordConfirming(control: AbstractControl) {
    const passwordControl = control.get('newPassword');
    const passwordConfirmationControl = control.get('newPasswordConfirmation');
    if (passwordControl.value !== passwordConfirmationControl.value) {
      passwordConfirmationControl.setErrors({passwordMismatch: true});
    }
  }

  passwordDiffer(control: AbstractControl){
    const oldPasswordControl = control.get('oldPassword');
    const newPasswordControl = control.get('newPassword');
    if (oldPasswordControl.value === newPasswordControl.value) {
      newPasswordControl.setErrors({oldNewPasswordMatch: true});
    }
  }

  onSubmit() {
    validateAllFormFields(this.form);
    if (!this.form.valid) {
      return;
    }

    const userData: UserChangePassword = {
      oldPassword: this.oldPassword.value,
      newPassword: this.newPassword.value
    };

    this.userService.changePassword(userData).subscribe(() => {
        return this.router.navigate(["/", "profile"]);
      },
      () => alert('Неверно введен старый пароль'));
  }
}


