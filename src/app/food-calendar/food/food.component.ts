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
import { FoodCardComponent } from './food-card/food-card.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { currentFoodsStore } from './currentFoods.store.';
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
    FoodCardComponent,
    PaginatorComponent,
  ],
})
export class FoodComponent {
  day!: Date;
  loading: boolean = false;
  daySubscription!: Subscription;
  currentPageIdx!: number;
  foods: Food[] = [];
  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    public loaderService: LoaderService,
    private foodService: FoodService,
    public currentFoodsStorage: currentFoodsStore
  ) {}
  ngOnInit() {
    this.foods = [];
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('date')) {
        this.day = JSON.parse(params.get('date') || '{}');

        this.foodService.getFoodByDate(this.day).subscribe(food => {
          this.foods.push(...food);
          this.currentFoodsStorage.currentFoods = this.foods.slice(0, 5);
        });
      }
    });

    this.loaderService.showLoader();

    setTimeout(() => {
      this.loaderService.hideLoader();
    }, 700);
    this.currentFoodsStorage.currentFoods = this.foods.slice(0, 5);
  }
  back() {
    this.location.back();
  }

}
