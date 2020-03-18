import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {FormStyle, getLocaleMonthNames, Location, TranslationWidth} from "@angular/common";
import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {DatePeriod} from "../services/date-period";
import {RecordService} from "../services/record.service";
import {DashboardModelService, DatePeriodCategorySummary} from "../services/dashboard.service";
import {ActivatedRoute} from "@angular/router";
import {RecordType} from "../services/record";
import {CategorySum} from "../services/category";
import {formatDateISO} from "../utils/date-utils";
import {Subscription} from "rxjs";
import {ChartType} from 'chart.js';
import {MultiDataSet, Label} from 'ng2-charts';

@Component({
  selector: 'app-record-type-summary',
  templateUrl: './record-type-summary.component.html',
  styleUrls: ['./record-type-summary.component.scss']
})
export class RecordTypeSummaryComponent implements OnInit {

  form: FormGroup;
  recordType: RecordType;
  categories: CategorySum[] = [];
  totalSum: number;
  queryParams: { startDate: string, endDate: string, recordType: RecordType };
  subscription: Subscription;
  isLoaded: boolean = false;

  doughnutChartType: ChartType = 'doughnut';
  doughnutChartLabels: Label[] = [];
  doughnutChartData: MultiDataSet = [
    []
  ];

  constructor(
    private fb: FormBuilder,
    private dashboardService: DashboardModelService,
    private route: ActivatedRoute,
    private location: Location,
  ) {
  }

  get periodSelect() {
    return this.form.controls.periodSelect;
  }

  onDatePeriodChanged(datePeriod: DatePeriod) {
    this.doughnutChartLabels = [];
    this.doughnutChartData[0] = [];
    if (this.subscription != undefined) {
      this.subscription.unsubscribe();
    }

    this.isLoaded = false;
    const typeRecordString = this.route.snapshot.paramMap.get('recordType');
    this.recordType = RecordType[typeRecordString];

    this.subscription = this.dashboardService.getCategorySummary(datePeriod, this.recordType).subscribe(items => {
      this.categories = items.categories;
      this.totalSum = items.sum;
      this.isLoaded = true;

      for (let category of this.categories) {
        this.doughnutChartLabels.push(category.name);
        this.doughnutChartData[0].push(category.sum);
      }
    });

    this.queryParams = {
      startDate: formatDateISO(datePeriod.startDate),
      endDate: formatDateISO(datePeriod.endDate),
      recordType: this.recordType
    };
  }

  ngOnInit() {
    this.form = this.fb.group({
      periodSelect: ['month', [Validators.required]],
    });
  }

  backClicked() {
    this.location.back();
  }
}
