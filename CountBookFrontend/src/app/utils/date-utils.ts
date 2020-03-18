import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {formatDate} from "@angular/common";

export function formatNgbDateISO(date: NgbDate): string {
  return formatDateISO(new Date(date.year, date.month - 1, date.day));
}

export function parseNgbDate(dateString: string): NgbDate {
  return dateToNgbDate(new Date(dateString));
}

export function dateToNgbDate(date: Date): NgbDate {
  return new NgbDate(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export function addDays(date: Date, daysNumber: number): Date {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + daysNumber);
  return newDate;
}

export function formatDates(date1: Date, date2: Date, locale: string): string {
  if (date1.getFullYear() !== date2.getFullYear()) {
    return formatDate(date1, "mediumDate", locale) + " - " + formatDate(date2, "mediumDate", locale);
  }
  if (date1.getMonth() !== date2.getMonth()) {
    return formatDate(date1, "d MMM", locale) + " - " + formatDate(date2, "mediumDate", locale);
  }
  if(date1.getDate() === date2.getDate()){
    return formatDate(date1, "longDate", locale);
  }
  return formatDate(date1, "d", locale) + " - " + formatDate(date2, "longDate", locale);
}

export function formatDateISO(date: Date): string {
  return date ? formatDate(date, "yyyy-MM-dd", "en") : null;
}
