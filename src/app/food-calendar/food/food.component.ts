import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Day, Food } from 'src/app/models/calendar.model';
import { CalendarService } from '../calendar.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/shared/common/loader/loader.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LoaderComponent } from 'src/app/shared/common/loader/loader.component';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  standalone: true,
  imports: [MatPaginatorModule, CommonModule, LoaderComponent]
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
    public loaderService: LoaderService
  ) {}
  ngOnInit() {
    
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('date')) {
        console.log(params);
        this.day = JSON.parse(params.get('date') || '{}');
        this.foods = this.day.foods;
      }
    });
    this.loaderService.showLoader();

    setTimeout(() => {
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
