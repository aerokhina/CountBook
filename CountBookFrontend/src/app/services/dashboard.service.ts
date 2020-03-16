import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Record, RecordType} from "./record";
import {Dashboard} from "./dashboard";
import {Category, CategorySum} from "./category";
import {DatePeriod} from "./date-period";
import {formatDateISO} from "../utils/date-utils";

@Injectable({
  providedIn: 'root'
})
export class DashboardModelService {

  constructor(private http: HttpClient) {
  }

  getDashboard() {
    return this.http.get<Dashboard>("http://localhost:5000/summary/get");
  }

  getCategorySummary(datePeriod: DatePeriod, recordType: RecordType) {
    return this.http.post<DatePeriodCategorySummary>("http://localhost:5000/summary/getbytype", {
      startDate: formatDateISO(datePeriod.startDate),
      endDate: formatDateISO(datePeriod.endDate), recordType: recordType
    });
  }
}

export interface DatePeriodCategorySummary {
  categories: CategorySum[];
  sum: number;
}

