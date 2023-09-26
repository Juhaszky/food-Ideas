import { Component, OnInit, Output } from '@angular/core';
import { CalendarService } from './calendar.service';
import { Month } from '../models/calendar.model';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-food-calendar',
  templateUrl: './food-calendar.component.html',
  styleUrls: ['./food-calendar.component.scss'],
})
export class FoodCalendarComponent implements OnInit {
  calendarData: Month[] = [];
  clickedDays: Date[] = [];
  @Output() selectedMonth: Month = this.calendarData[0];
  constructor(private calendarService: CalendarService) {}
  ngOnInit(): void {
    this.calendarService.daySubject.subscribe((day: Date) => {
      this.clickedDays.push(day);
      console.log(this.clickedDays);
    });
    this.calendarService
      .generateMonths()
      .subscribe(months => (this.calendarData = months));

    this.selectedMonth = this.calendarData[0];
  }

  onChange(event: MatSelectChange) {
    const monthIdx = event.value;
    this.selectedMonth = this.calendarData[monthIdx];
  }
}
