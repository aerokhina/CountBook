import {Injectable} from '@angular/core';
import {CreateRecordModel, Record, RecordFilterModel} from "./record";
import {formatDateISO} from "../utils/date-utils";
import {HttpAuthService} from "../account/core/http-auth.service";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpAuthService) {
  }

  getRecords(filterModel: RecordFilterModel) {
    return this.http.post<Record[]>("record/getlist", {
      categoryId: filterModel.categoryId, startDate: formatDateISO(filterModel.date.startDate),
      endDate: formatDateISO(filterModel.date.endDate), type: filterModel.recordType
    });
  }

  getRecord(id: number) {
    return this.http.get<Record>("record/get/" + id);
  }

  addRecord(record: CreateRecordModel) {
    return this.http.post("record/create", record);
  }

  deleteRecord(id: number) {
    return this.http.post("record/delete/" + id, {});
  }

  editRecord(id: number, record: CreateRecordModel) {
    return this.http.post("record/edit/" + id, record);
  }
}
