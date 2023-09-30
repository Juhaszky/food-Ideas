import { Injectable } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { User } from '../models/user.model';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private localStorageService: LocalStorageService) {}

  getUserData(): User {
    return this.localStorageService.getCurrentUser();
  }
  saveUserData(formData: FormGroup): void {
    console.log(formData);
    const user: User = {
      email: formData.value.email,
      password: formData.value.password,
      nickName: formData.value.userInformation.nickName ?? '',
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
    const userInformation: AbstractControl | null = form.get('userInformation') || null;
    if (userInformation) {
      userInformation.get('nickName')?.setValue(userData.nickName);
      userInformation.get('address')?.setValue(userData.address);
      userInformation.get('phoneNumber')?.setValue(userData.phoneNumber);
      userInformation.get('birth')?.setValue(userData.birth);
    }
  }
}
