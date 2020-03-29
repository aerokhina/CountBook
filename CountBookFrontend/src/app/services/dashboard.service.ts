import {Injectable} from '@angular/core';
import {RecordType} from "./record";
import {Dashboard} from "./dashboard";
import {CategorySum} from "./category";
import {DatePeriod} from "./date-period";
import {formatDateISO} from "../utils/date-utils";
import {HttpAuthService} from "../account/core/http-auth.service";

@Injectable({
  providedIn: 'root'
})
export class DashboardModelService {

  constructor(private http: HttpAuthService) {
  }

  getDashboard() {
    return this.http.get<Dashboard>("summary/get");
  }

  getCategorySummary(datePeriod: DatePeriod, recordType: RecordType) {
    return this.http.post<DatePeriodCategorySummary>("summary/getbytype", {
      startDate: formatDateISO(datePeriod.startDate),
      endDate: formatDateISO(datePeriod.endDate), recordType: recordType
    });
  }
}

export interface DatePeriodCategorySummary {
  categories: CategorySum[];
  sum: number;
}

