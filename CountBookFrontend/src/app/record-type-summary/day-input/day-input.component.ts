import {Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {formatDate} from "@angular/common";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {addDays} from "../../utils/date-utils";
import {DatePeriod} from "../../services/date-period";

@Component({
  selector: 'app-day-input',
  templateUrl: './day-input.component.html',
  styleUrls: ['./day-input.component.scss']
})
export class DayInputComponent implements OnInit {

  form: FormGroup;
  day: Date;
  @Output() onChanged = new EventEmitter<DatePeriod>();

  constructor(
    private fb: FormBuilder,
    @Inject(LOCALE_ID) public locale: string
  ) {
  }

  get currentDayString() {
    return formatDate(this.day, "fullDate", this.locale);
  }

  get datePickerDate(): NgbDate {
    return new NgbDate(this.day.getFullYear(), this.day.getMonth() + 1, this.day.getDate());
  }

  setPreviousDay(): void {
    this.day.setDate(this.day.getDate() - 1);
    this.form.controls.daySelect.setValue(this.datePickerDate);
  }

  setNextDay(): void {
    this.day.setDate(this.day.getDate() + 1);
    this.form.controls.daySelect.setValue(this.datePickerDate);
  }

  ngOnInit() {
    this.form = this.fb.group({
      daySelect: [''],
    });
    this.form.controls.daySelect.valueChanges.subscribe((x: NgbDate) => {
      this.day = new Date(x.year, x.month - 1, x.day);
      this.onChanged.emit({startDate: this.day, endDate: this.day});
    });
    this.day = new Date();
    this.form.controls.daySelect.setValue(this.datePickerDate);
  }

}
