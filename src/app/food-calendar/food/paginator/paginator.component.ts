import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { FoodService } from '../food.service';
import { Food } from 'src/app/models/calendar.model';
import { currentFoodsStore } from '../currentFoods.store.';

@Component({
  selector: 'paginator',
  standalone: true,
  imports: [CommonModule, MatPaginatorModule],
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() foods:Food[] = [];
  constructor(private foodStorage: currentFoodsStore) {
    
  }
  handlePageEvnt(e: PageEvent) {
    this.getFoodByPageIdx(e.pageIndex);
  }
  private getFoodByPageIdx(pageNumber: number): void {
    const to = (pageNumber + 1) * 5;
    const from = to >= 5 ? to - 5 : to - pageNumber;
    this.foodStorage.currentFoods = this.foods.slice(from, to);
  }
}
