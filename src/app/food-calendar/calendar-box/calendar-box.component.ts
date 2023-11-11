import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Day } from 'src/app/models/calendar.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar-box',
  templateUrl: './calendar-box.component.html',
  styleUrls: ['./calendar-box.component.scss'],
  standalone: true
})
export class CalendarBoxComponent {
  @ViewChild('day') dayEl!: ElementRef;
  @Input() day!: Day;
  formattedDate!: string;
  dayClicked = false;
  constructor(private router: Router) {}

  ngOnInit() {
    this.formattedDate = JSON.stringify(this.day.date.getDate());
  }

  selectDay() {
    const date = JSON.stringify(this.day.date);
    this.router.navigate(['/food', JSON.stringify(this.day)]);
  }
}
