import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../account.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private readonly accountService: AccountService) {
  }

  get name() {
    return this.form.controls.name;
  }

  get email() {
    return this.form.controls.email;
  }

  get password() {
    return this.form.controls.password;
  }

  get passwordConfirmation() {
    return this.form.controls.passwordConfirmation;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      passwordConfirmation: ['', [Validators.required]]
    }, {
      validators: this.passwordConfirming
    })
  }

  passwordConfirming(control: AbstractControl) {
    const passwordControl = control.get('password');
    const passwordConfirmationControl = control.get('passwordConfirmation');
    if (passwordControl.value !== passwordConfirmationControl.value) {
      passwordConfirmationControl.setErrors({passwordMismatch: true});
    }
  }

  onSubmit() {
    const controls = this.form.controls;
    this.accountService.register(controls.name.value, controls.email.value, controls.password.value).subscribe(
      result => {
      },
      () => alert('Произошла ошибка регистрации'));
  }
}
