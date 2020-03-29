import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";
import {validateAllFormFields} from "../../../core/validation";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly accountService: AccountService) { }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]

    })
  }

  onSubmit() {
    validateAllFormFields(this.form);
    if (!this.form.valid) {
      return;
    }

    const controls = this.form.controls;
    const loginResult = this.accountService.login(controls.email.value, controls.password.value);
    loginResult.subscribe(
      result => {
      },
      () => alert('Invalid login or password'));
  }

}
