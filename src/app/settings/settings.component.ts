import { Component, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { SettingsService } from './settings.service';
import { User } from '../models/user.model';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  panelOpenState = false;
  //settingsForm!: FormGroup;
  userData!: User;

  formChanged = false;
  settingsForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    nickName: new FormControl(''),
    userInformation: new FormGroup({
      address: new FormControl(''),
      phone: new FormControl(''),
      birth: new FormControl(''),
    }),
  });

  constructor(
    private settingsService: SettingsService,
    private homeService: HomeService,
  ) {}

  ngOnInit(): void {
    this.userData = this.settingsService.getUserData();
    this.settingsForm.get('email')?.setValue(this.userData.email);
    this.settingsForm.get('password')?.setValue(this.userData.password);
    const originalValues = this.settingsForm.value;
    this.settingsForm.valueChanges.subscribe((formData: any) => {
      this.formChanged = !this.settingsService.isFormDataEqual(
        originalValues,
        formData,
      );
    });
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      if (this.settingsForm.value.email && this.settingsForm.value.password) {
        this.settingsService.saveUserData(this.settingsForm);
        this.homeService.nickNameSubject.next(
          this.settingsForm.value.nickName ?? '',
        );
      }
    }
  }
}
