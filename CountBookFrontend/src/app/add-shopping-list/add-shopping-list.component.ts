import {Component, OnInit} from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ShoppingItemService} from "../services/shopping-item.service";
import {CreateShoppingItemModel, ShoppingItem} from "../services/shopping-item";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validateAllFormFields} from "../../core/validation";

@Component({
  selector: 'app-add-shopping-list',
  templateUrl: './add-shopping-list.component.html',
  styleUrls: ['./add-shopping-list.component.scss']
})
export class AddShoppingListComponent implements OnInit {

  form: FormGroup;
  shoppingItem: ShoppingItem[] = [];
  isLoaded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private shoppingItemService: ShoppingItemService,
    private modalService: NgbModal,
    private readonly router: Router
  ) {
  }

  get name() {
    return this.form.controls.name;
  }

  ngOnInit() {
    this.shoppingItemService.getItems().subscribe(items => {
        this.shoppingItem = items;
        this.isLoaded = true;
      }
    );
    this.form = this.fb.group({
      name: ['', [Validators.required]]
    });
  }

  onDelete(content, shoppingItemId: number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
      this.shoppingItemService.deleteItem(shoppingItemId).subscribe(() => {
        this.shoppingItem = this.shoppingItem.filter(x => x.id !== shoppingItemId);
      });
    }, () => {
    });
  }

  onAddItem(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      validateAllFormFields(this.form);
      if (!this.form.valid) {
        return;
      }
      const item: CreateShoppingItemModel = {
        name: this.name.value
      };
      this.isLoaded = false;
      this.shoppingItemService.addItem(item).subscribe(createdItem => {
        this.shoppingItem.push(createdItem);
        this.isLoaded = true;
      });
    }, (reason) => {
    });
  }
}
