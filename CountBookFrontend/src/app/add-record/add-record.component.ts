import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {NgbDate, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {validateAllFormFields} from "../../core/validation";
import {RecordService} from "../services/record.service";
import {CreateRecordModel, RecordType} from "../services/record";
import {Category, CreateCategoryModel} from "../services/category";
import {CategoryService} from "../services/category.service";
import {dateToNgbDate, formatNgbDateISO, parseNgbDate} from "../utils/date-utils";

@Component({
  selector: 'add-record',
  templateUrl: './add-record.component.html',
  styleUrls: ['./add-record.component.scss']
})
export class AddRecordComponent implements OnInit {

  form: FormGroup;
  addCategoryWindow: FormGroup;
  recordType = RecordType;
  id: number;
  categories: Category[] = [];
  isLoaded: boolean = true;
  isLoadedCategory: boolean = false;

  constructor(
    private fb: FormBuilder,
    private readonly router: Router,
    private modalService: NgbModal,
    private recordService: RecordService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private categoryFormBuilder: FormBuilder
  ) {
  }

  get name() {
    return this.form.controls.name;
  }

  get amount() {
    return this.form.controls.amount;
  }

  get typeSelect() {
    return this.form.controls.typeSelect;
  }

  get categorySelect() {
    return this.form.controls.categorySelect;
  }

  get categoryName() {
    return this.addCategoryWindow.controls.categoryName;
  }

  get date() {
    return this.form.controls.date;
  }

  setToday(): void {
    this.date.setValue(dateToNgbDate(new Date()));
  }

  ngOnInit(): void {
    const initialType = this.route.snapshot.queryParams['type'];
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$')]],
      typeSelect: [RecordType[initialType], [Validators.required]],
      categorySelect: ['', [Validators.required]],
      date: ['', [Validators.required]]
    });
    this.setToday();
    this.addCategoryWindow = this.categoryFormBuilder.group({
      categoryName: ['', [Validators.required]],
    });
    this.categoryService.getCategorys().subscribe(items => {
      this.categories = items;
      this.isLoadedCategory = true;
    });

    const idString = this.route.snapshot.paramMap.get('id');

    if (idString) {
      this.isLoaded = false;
      this.id = parseInt(idString);
      this.recordService.getRecord(this.id).subscribe(record => {
          this.name.setValue(record.name);
          this.amount.setValue(record.amount);
          this.typeSelect.setValue(record.type);
          this.categorySelect.setValue(record.categoryId);
          this.date.setValue(parseNgbDate(record.date));
          this.isLoaded = true;
        }
      );
    }
  }

  onSubmit() {
    validateAllFormFields(this.form);
    if (!this.form.valid) {
      return;
    }

    const record: CreateRecordModel = {
      name: this.name.value,
      amount: this.amount.value,
      type: parseInt(this.typeSelect.value),
      categoryId: this.categorySelect.value,
      date: formatNgbDateISO(this.date.value)
    };
    const recordObservable = this.id
      ? this.recordService.editRecord(this.id, record)
      : this.recordService.addRecord(record);
    recordObservable.subscribe(() => {
      return this.router.navigate(["/", "dashboard"]);
    });
  }

  onCancel(content) {
    this.open(content);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.router.navigate(["/", "dashboard"]);
    }, (reason) => {
    });
  }

  onAddCategory(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      const item: CreateCategoryModel = {
        name: this.categoryName.value
      };
      this.categoryService.addCategory(item).subscribe(createdItem => {
        this.categories.push(createdItem);
      });
    }, (reason) => {
    });
  }

  onAddCategoryName(modal) {
    validateAllFormFields(this.addCategoryWindow);
    if (!this.addCategoryWindow.valid) {
      return;
    }
    modal.close();
  }
}
