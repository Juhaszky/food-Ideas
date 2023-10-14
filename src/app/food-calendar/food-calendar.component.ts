import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { CalendarService } from './calendar.service';
import {  Month } from '../models/calendar.model';
import { MatSelectChange } from '@angular/material/select';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-food-calendar',
  templateUrl: './food-calendar.component.html',
  styleUrls: ['./food-calendar.component.scss'],
})
export class FoodCalendarComponent implements OnInit, OnDestroy {
  calendarData: Month[] = [];
  clickedDays: Date[] = [];
  toolTipText: string = '';
  selectedMonthIdx!: number;
  private subscriptions: Subscription[] = [];
  @Output() selectedMonth!: Month;

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    const sub = this.calendarService
      .generateMonths()
      .subscribe(months => (this.calendarData = months));
    this.subscriptions.push(sub);
    this.selectedMonthIdx = this.calendarService.selectedMonthIdx;
    this.selectedMonth = this.calendarData[this.selectedMonthIdx ?? 0];
    this.calendarService.setSelectedMonth(this.selectedMonthIdx);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onChange(event: MatSelectChange) {
    const monthIdx = event.value;
    this.selectedMonthIdx = monthIdx;
    this.selectedMonth = this.calendarData[monthIdx];
    this.calendarService.setSelectedMonth(monthIdx);
  }
}
