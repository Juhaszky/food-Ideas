import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Day, Food } from 'src/app/models/calendar.model';

@Injectable({
  providedIn: 'root',
})
export class FoodService {
  pageIdx!: number;
  constructor(private http: HttpClient) {}

  setPageIdx(idx: number) {
    this.pageIdx = idx;
  }
  getPageIdx(): number {
    return this.pageIdx ?? 0;
  }
  getFoodByDate(dayParam: Date): Observable<Food[]> {
    const date = new Date(dayParam).toLocaleDateString();
    return this.http.get<Food[]>(`http://localhost:5000/foods`, {
      params: { day: date },
    });
  }
}
