import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private localStorageService: LocalStorageService) {}

  getUserData(): User {
    return this.localStorageService.getCurrentUser();
  }

}
