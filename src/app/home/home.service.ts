import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  nickNameSubject = new Subject<string>();
  constructor(private localStorageService: LocalStorageService) {}

  getNickName() {
    return this.localStorageService.getNickName();
  }
}
