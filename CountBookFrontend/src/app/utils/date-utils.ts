import {NgbDate} from "@ng-bootstrap/ng-bootstrap";
import {formatDate} from "@angular/common";

export function formatDateOld(date: NgbDate): string {
  return addZero(4, date.year) + "-" + addZero(2, date.month) + "-" + addZero(2, date.day);
}

export function addZero(digitsLength: number, source: number): string {
  let text = source.toString();
  while (text.length < digitsLength) {
    text = '0' + text;
  }
  return text;
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
