import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { SettingsService } from './settings.service';
import { User } from '../models/user.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  @ViewChild('settingsFormEl') settingsFormformEl!: FormGroup;
  panelOpenState = false;
  //settingsForm!: FormGroup;
  userData!: User;
  constructor(private settingsService: SettingsService) {}
  settingsForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    userInformation: new FormGroup({
      address: new FormControl(''),
      phone: new FormControl(''),
      birth: new FormControl(''),
    }),
  });

  ngOnInit(): void {
    this.userData = this.settingsService.getUserData();
    this.settingsForm.get('email')?.setValue(this.userData.email);
    this.settingsForm.get('password')?.setValue(this.userData.password);
  }

  onSubmit() {
    if (this.settingsForm.valid) {
      if (this.settingsForm.value.email && this.settingsForm.value.password) {
        this.settingsService.saveUserData(this.settingsForm);
      }
    }
  }
}
