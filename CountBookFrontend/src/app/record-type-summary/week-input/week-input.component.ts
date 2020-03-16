import {Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {formatDate, FormStyle, getLocaleMonthNames, TranslationWidth} from "@angular/common";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {addDays, formatDates} from "../../utils/date-utils";
import {DatePeriod} from "../../services/date-period";

@Component({
  selector: 'app-week-input',
  templateUrl: './week-input.component.html',
  styleUrls: ['./week-input.component.scss']
})
export class WeekInputComponent implements OnInit {

  form: FormGroup;
  firstWeekDay: Date;
  @Output() onChanged = new EventEmitter<DatePeriod>();

  constructor(
    private fb: FormBuilder,
    @Inject(LOCALE_ID) public locale: string) {
  }

  get currentWeekString() {
    const lastWeekDay = addDays(this.firstWeekDay, 6);
    return formatDates(this.firstWeekDay, lastWeekDay, this.locale);
  }

  get datePickerDate(): NgbDate {
    return new NgbDate(this.firstWeekDay.getFullYear(), this.firstWeekDay.getMonth() + 1, this.firstWeekDay.getDate());
  }

  setPreviousWeek(): void {
    this.firstWeekDay = addDays(this.firstWeekDay, -7);
    this.form.controls.weekSelect.setValue(this.datePickerDate);
  }

  setNextWeek(): void {
    this.firstWeekDay = addDays(this.firstWeekDay, 7);
    this.form.controls.weekSelect.setValue(this.datePickerDate);
  }

  ngOnInit() {
    this.setFirstWeekDay(new Date());
    this.form = this.fb.group({
      weekSelect: [''],
    });
    this.form.controls.weekSelect.valueChanges.subscribe((x: NgbDate) => {
      this.setFirstWeekDay(new Date(x.year, x.month - 1, x.day));
      const lastWeekDay = addDays(this.firstWeekDay, 6);
      this.onChanged.emit({startDate: this.firstWeekDay, endDate: lastWeekDay});
    });
    this.form.controls.weekSelect.setValue(this.datePickerDate);
  }

  private setFirstWeekDay(date: Date): void {
    let dayOfWeek = date.getDay();
    dayOfWeek = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    this.firstWeekDay = addDays(date, -dayOfWeek);
  }
}
