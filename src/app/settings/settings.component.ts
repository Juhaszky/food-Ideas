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
import { birthValidator } from '../shared/birth.validator.directive';

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
    userInformation: new FormGroup({
      nickName: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      birth: new FormControl('', [birthValidator()]),
    }),
  });

  constructor(
    private settingsService: SettingsService,
    private homeService: HomeService,
  ) {}

  ngOnInit(): void {
    this.settingsService.fillFormData(this.settingsForm);
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
      const userInformation = this.settingsForm.get('userInformation');
      if (userInformation &&this.settingsForm.value.email && this.settingsForm.value.password) {
        this.settingsService.saveUserData(this.settingsForm);
        this.homeService.nickNameSubject.next(
          userInformation.get('nickName')?.value ?? '',
        );
      }
    }
  }
}
