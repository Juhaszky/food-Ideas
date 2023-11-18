import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Day, Food } from 'src/app/models/calendar.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/shared/common/loader/loader.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { LoaderComponent } from 'src/app/shared/common/loader/loader.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { CreateFoodComponent } from './create-food/create-food.component';
import { FoodService } from './food.service';
@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss'],
  standalone: true,
  imports: [
    MatPaginatorModule,
    CommonModule,
    LoaderComponent,
    MatSidenavModule,
    CreateFoodComponent,
  ],
})
export class FoodComponent {
  day!: Date;
  loading: boolean = false;
  daySubscription!: Subscription;
  currentPageIdx!: number;
  foods: Food[] = [];
  currentFoods: Food[] = [];
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public loaderService: LoaderService,
    private foodService: FoodService,
  ) {}
  ngOnInit() {
    this.foods = [];
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('date')) {
        this.day = JSON.parse(params.get('date') || '{}');

        this.foodService.getFoodByDate(this.day).subscribe(food => {
          this.foods.push(...food);
          this.currentFoods = this.foods.slice(0, 5);
        });
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
    const to = (pageNumber + 1) * 5;
    const from = to >= 5 ? to - 5 : to - pageNumber;
    this.currentFoods = this.foods.slice(from, to);
  }
}
