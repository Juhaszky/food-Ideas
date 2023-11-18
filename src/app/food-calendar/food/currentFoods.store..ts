import { Injectable } from '@angular/core';
import { Food } from 'src/app/models/calendar.model';

@Injectable({
  providedIn: 'root',
})
export class currentFoodsStore {
  currentFoods: Food[] = [];
  constructor() { }
}
