import {DatePeriod} from "./date-period";

export interface Record {
  id: number;
  name: string;
  amount: number;
  type: RecordType;
  categoryId: number;
  date: string;
}

export enum RecordType{
  Income,
  Expense
}

export interface CreateRecordModel{
  name: string;
  amount: number;
  type: RecordType;
  categoryId: number;
  date: string;
}

export interface RecordFilterModel{
  categoryId: number;
  date: DatePeriod;
  recordType: RecordType;
}
