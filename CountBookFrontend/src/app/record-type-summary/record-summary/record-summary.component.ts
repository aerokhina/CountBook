import {Component, EventEmitter, Inject, LOCALE_ID, OnInit, Output} from '@angular/core';
import {Category} from "../../services/category";
import {ActivatedRoute} from "@angular/router";
import {RecordService} from "../../services/record.service";
import {CategoryService} from "../../services/category.service";
import {Record, RecordFilterModel, RecordType} from "../../services/record";
import {formatDateISO, formatDates} from "../../utils/date-utils";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Location} from '@angular/common';

@Component({
  selector: 'app-record-summary',
  templateUrl: './record-summary.component.html',
  styleUrls: ['./record-summary.component.scss']
})
export class RecordSummaryComponent implements OnInit {

  filter: RecordFilterModel;
  category: Category;
  records: Record[] = [];


  constructor(
    private route: ActivatedRoute,
    private recordService: RecordService,
    private categoryService: CategoryService,
    private modalService: NgbModal,
    private location: Location,
    @Inject(LOCALE_ID) public locale: string
  ) {
  }

  get datePeriodString() {
    if (this.filter.date.startDate && this.filter.date.endDate) {
      return formatDates(this.filter.date.startDate, this.filter.date.endDate, this.locale);
    }
    return "Все время";
  }

  get categoryName() {
    return this.category ? this.category.name : null;
  }

  ngOnInit() {
    const idString = this.route.snapshot.paramMap.get('id');
    const startDateString = this.route.snapshot.queryParams['startDate'];
    const endDateString = this.route.snapshot.queryParams['endDate'];
    const recordTypeString = this.route.snapshot.queryParams['recordType'];

    if (idString && recordTypeString) {
      this.filter = {
        categoryId: parseInt(idString),
        date: {
          startDate: startDateString ? new Date(startDateString) : null,
          endDate: endDateString ? new Date(endDateString) : null
        },
        recordType: parseInt(recordTypeString)
      };
      this.categoryService.getCategory(this.filter.categoryId).subscribe(item => this.category = item);
      this.recordService.getRecords(this.filter).subscribe(records => this.records = records);
    }
  }

  onDelete(content, recordId: number) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
        this.recordService.deleteRecord(recordId).subscribe(() => {
          this.records = this.records.filter(x => x.id !== recordId)
        });
      },
      () => {
      });
  }

  backClicked() {
    this.location.back();
  }
}
