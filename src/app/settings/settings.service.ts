import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../models/user.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private localStorageService: LocalStorageService) {}

  getUserData(): User {
    return this.localStorageService.getCurrentUser();
  }
  saveUserData(formData: FormGroup): void {
    const user: User = {
      email: formData.value.email,
      password: formData.value.password,
      nickName: formData.value.nickName,
      address: formData.value.userInformation.address ?? '',
      phoneNumber: formData.value.userInformation.phoneNumber ?? '',
      birth: formData.value.userInformation.birth ?? '',
    };
    //userData.address = formData?.address ?? '';
    return this.localStorageService.saveCurrentUser(user);
  }

  isFormDataEqual(formDataStart: any, changedFormData: any): boolean {
    return JSON.stringify(formDataStart) === JSON.stringify(changedFormData);
  }

  fillFormData(form: FormGroup): void {
    const userData = this.getUserData();

    form.get('email')?.setValue(userData.email);
    form.get('password')?.setValue(userData.password);
    form.get('nickName')?.setValue(userData.nickName);
    form.get('address')?.setValue(userData.address);
    form.get('phoneNumber')?.setValue(userData.phoneNumber);
    form.get('birth')?.setValue(userData.birth);
  }
}
