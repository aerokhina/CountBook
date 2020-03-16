import {Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormStyle, getLocaleMonthNames, TranslationWidth} from "@angular/common";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {DatePeriod} from "../../services/date-period";

@Component({
  selector: 'app-month-input',
  templateUrl: './month-input.component.html',
  styleUrls: ['./month-input.component.scss']
})
export class MonthInputComponent implements OnInit {

  form: FormGroup;
  currentMonth: {
    month: number,
    year: number
  };
  monthNames: string[];
  @Output() onChanged = new EventEmitter<DatePeriod>();

  constructor(
    private fb: FormBuilder,
    @Inject(LOCALE_ID) public locale: string) {
    this.monthNames = getLocaleMonthNames(locale, FormStyle.Standalone, TranslationWidth.Wide);
  }

  get currentMonthString() {
    return this.monthNames[this.currentMonth.month] + ", " + this.currentMonth.year;
  }

  get datePickerDate(): NgbDate {
    return new NgbDate(this.currentMonth.year, this.currentMonth.month + 1, 1);
  }

  setPreviousMonth(): void {
    if (this.currentMonth.month > 0) {
      this.currentMonth.month--;
    } else {
      this.currentMonth.month = this.monthNames.length - 1;
      this.currentMonth.year--;
    }
    this.form.controls.monthSelect.setValue(this.datePickerDate);
  }

  setNextMonth(): void {
    if (this.currentMonth.month < this.monthNames.length - 1) {
      this.currentMonth.month++;
    } else {
      this.currentMonth.month = 0;
      this.currentMonth.year++;
    }
    this.form.controls.monthSelect.setValue(this.datePickerDate);
  }

  ngOnInit() {
    this.form = this.fb.group({
      monthSelect: [''],
    });
    this.form.controls.monthSelect.valueChanges.subscribe((x: NgbDate) => {
      this.currentMonth.month = x.month - 1;
      this.currentMonth.year = x.year;
      this.onChanged.emit({
        startDate: new Date(this.currentMonth.year, this.currentMonth.month, 1),
        endDate: new Date(this.currentMonth.year, this.currentMonth.month + 1, 0)
      });
    });
    const date = new Date();
    this.currentMonth = {month: date.getMonth(), year: date.getFullYear()};
    this.form.controls.monthSelect.setValue(this.datePickerDate);
  }

}
