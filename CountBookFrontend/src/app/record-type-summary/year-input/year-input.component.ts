import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {DatePeriod} from "../../services/date-period";

@Component({
  selector: 'app-year-input',
  templateUrl: './year-input.component.html',
  styleUrls: ['./year-input.component.scss']
})
export class YearInputComponent implements OnInit {

  form: FormGroup;
  years: number[] = [];
  @Output() onChanged = new EventEmitter<DatePeriod>();

  constructor(
    private fb: FormBuilder,
  ) {
  }

  get selectedYear() {
    return this.form.controls.yearSelect.value;
  }

  set selectedYear(value: number) {
    this.form.controls.yearSelect.setValue(value);
  }

  setPreviousYear(): void {
    this.selectedYear--;
  }

  setNextYear(): void {
    this.selectedYear++;
  }

  ngOnInit() {
    this.form = this.fb.group({
      yearSelect: [''],
    });
    this.buildYears();
    this.form.controls.yearSelect.valueChanges.subscribe(() => {
      this.buildYears();
      this.onChanged.emit({
        startDate: new Date(this.selectedYear, 0, 1),
        endDate: new Date(this.selectedYear, 11, 31),
      });
    });
    this.selectedYear = new Date().getFullYear();
  }

  buildYears(): void {
    this.years = [];
    for (let i = -10; i <= 10; i++) {
      this.years.push(this.selectedYear + i);
    }
  }
}
