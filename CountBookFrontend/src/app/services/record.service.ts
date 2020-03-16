import {Injectable} from '@angular/core';
import {CreateRecordModel, Record, RecordFilterModel, RecordType} from "./record";
import {HttpClient} from "@angular/common/http";
import {formatDateISO} from "../utils/date-utils";

@Injectable({
  providedIn: 'root'
})
export class RecordService {

  constructor(private http: HttpClient) {
  }

  getRecords(filterModel: RecordFilterModel) {
    return this.http.post<Record[]>("http://localhost:5000/record/getlist", {
      categoryId: filterModel.categoryId, startDate: formatDateISO(filterModel.date.startDate),
      endDate: formatDateISO(filterModel.date.endDate), type: filterModel.recordType
    });
  }

  getRecord(id: number) {
    return this.http.get<Record>("http://localhost:5000/record/get/" + id);
  }

  addRecord(record: CreateRecordModel) {
    return this.http.post("http://localhost:5000/record/create", record);
  }

  deleteRecord(id: number) {
    return this.http.post("http://localhost:5000/record/delete/" + id, {});
  }

  editRecord(id: number, record: CreateRecordModel) {
    return this.http.post("http://localhost:5000/record/edit/" + id, record);
  }
}
