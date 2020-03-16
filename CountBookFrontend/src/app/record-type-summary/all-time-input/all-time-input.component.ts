import {Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output} from '@angular/core';
import {DatePeriod} from "../../services/date-period";

@Component({
  selector: 'app-all-time-input',
  templateUrl: './all-time-input.component.html',
  styleUrls: ['./all-time-input.component.scss']
})
export class AllTimeInputComponent implements OnInit {

  @Output() onChanged = new EventEmitter<DatePeriod>();
  constructor(  ) { }

  ngOnInit() {
    this.onChanged.emit({
      startDate: null,
      endDate: null
    });
  }

}
