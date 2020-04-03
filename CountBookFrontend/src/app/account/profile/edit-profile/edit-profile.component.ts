import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../account.service";
import {UserEditModel} from "../../../services/user";
import {UserService} from "../../../services/user.service";
import {validateAllFormFields} from "../../../../core/validation";
import {Router} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {UserGroupService} from "../../../services/user-group.service";
import {CreateUserGroupModel, UserGroupModel} from "../../../services/user-group";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  form: FormGroup;
  addGroupWindow: FormGroup;
  userGroups: UserGroupModel[] = [];

  constructor(private fb: FormBuilder,
              private readonly accountService: AccountService,
              private userService: UserService,
              private router: Router,
              private modalService: NgbModal,
              private groupFormBuilder: FormBuilder,
              private userGroupService: UserGroupService) {
  }

  get name() {
    return this.form.controls.name;
  }

  get email() {
    return this.form.controls.email;
  }

  get groupSelect() {
    return this.form.controls.groupSelect;
  }

  get groupName() {
    return this.addGroupWindow.controls.groupName;
  }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      groupSelect: ['', [Validators.required]],
    });
    this.addGroupWindow = this.groupFormBuilder.group({
      groupName: ['', [Validators.required]],
    });
    this.userGroupService.getGroups().subscribe(items => {
      this.userGroups = items;
    });

    this.userService.getUser().subscribe(item => {
      this.name.setValue(item.name);
      this.email.setValue(item.email);
      this.groupSelect.setValue(item.userGroupId);
    });
  }

  onSubmit() {
    console.log("onSubmit");
    validateAllFormFields(this.form);
    if (!this.form.valid) {
      return;
    }

    const userData: UserEditModel = {
      name: this.name.value,
      email: this.email.value,
      userGroupId: this.groupSelect.value
    };

    this.userService.editProfile(userData).subscribe(() => {
      return this.router.navigate(["/", "profile"]);
    })
  }

  onAddGroup(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      const item: CreateUserGroupModel = {
        name: this.groupName.value
      };
      this.userGroupService.addGroup(item).subscribe(createdItem => {
        this.userGroups.push(createdItem);
      });
    }, (reason) => {
    });
  }

  onAddGroupName(modal) {
    validateAllFormFields(this.addGroupWindow);
    if (!this.addGroupWindow.valid) {
      return;
    }
    modal.close();
  }
}
