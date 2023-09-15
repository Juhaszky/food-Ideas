import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor(private localStorageService: LocalStorageService) { }

  getNickName(): string {
    return this.localStorageService.getNickName();
  }
}
