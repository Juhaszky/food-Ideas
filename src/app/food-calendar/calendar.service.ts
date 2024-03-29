import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Day, Event, Month } from '../models/calendar.model';
import { Observable, Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CalendarService {
  daySubject = new Subject<Date>();
  constructor(private datePipe: DatePipe) {}

  generateMonths(): Observable<Month[]> {
    const months: Month[] = [];
    for (let i = 0; i < 6; i++) {
      const currentDate = this.calculateDateForMonthOffset(i);
      const monthName = this.getMonthName(currentDate);
      const days = this.genereateDaysInMonth(currentDate);

      months.push({ name: monthName, days });
    }
    months.sort();

    return of(months);
  }



  private genereateDaysInMonth(date: Date): Day[] {
    const daysInMonth: number = this.getDaysInMonth(date);
    const days: Day[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(date.getFullYear(), date.getMonth(), i);
      const events: Event[] = [];

      days.push({ date: dayDate, events });
    }
    return days;
  }
  private getDaysInMonth(date: Date): number {
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return lastDayOfMonth.getDate();
  }

  private getMonthName(date: Date): string {
    return this.datePipe.transform(date, 'MMMM yyyy') ?? '';
  }

  private calculateDateForMonthOffset(offset: number): Date {
    const today = new Date();
    today.setMonth(today.getMonth() + offset);
    return today;
  }
}
