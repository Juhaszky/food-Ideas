import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Day, Food } from 'src/app/models/calendar.model';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/shared/common/loader/loader.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
})
export class FoodComponent {
  day: Day = this.calendarService.selectedDay;
  loading: boolean = false;
  daySubscription!: Subscription;
  currentPageIdx!: number;
  foods: Food[] = [];
  currentFoods: Food[] = [];
  constructor(
    private location: Location,
    private calendarService: CalendarService,
    private activatedRoute: ActivatedRoute,
    private loaderService: LoaderService
  ) {}
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('date')) {
        this.day = JSON.parse(params.get('date') || '{}');
        this.foods = this.day.foods;
      }
    });
    this.loaderService.showLoader();
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.loaderService.hideLoader();
    }, 700);
    this.currentFoods = this.foods.slice(0, 5);
  }
  back() {
    this.location.back();
  }
  handlePageEvnt(e: PageEvent) {

    this.getFoodByPageIdx(e.pageIndex);
  }
  private getFoodByPageIdx(pageNumber: number): void {
    const to = (pageNumber + 1)  * 5;
    const from = to >= 5 ? to - 5 : to - pageNumber;
    this.currentFoods = this.foods.slice(from, to);
  }
}
