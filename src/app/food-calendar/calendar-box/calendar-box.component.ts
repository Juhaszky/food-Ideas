import { Component, Input } from '@angular/core';
import { Day } from 'src/app/models/calendar.model';
import { CalendarService } from '../calendar.service';

@Component({
  selector: 'app-calendar-box',
  templateUrl: './calendar-box.component.html',
  styleUrls: ['./calendar-box.component.scss'],
})
export class CalendarBoxComponent {
  @Input() day!: Day;
  formattedDate!: string;
  dayClicked = false;
  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.formattedDate = JSON.stringify(this.day.date.getDate());
  }

  clicked() {
    this.dayClicked = !this.dayClicked;
    this.calendarService.daySubject.next(this.day.date);
  }
}
