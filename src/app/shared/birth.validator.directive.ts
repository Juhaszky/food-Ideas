import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

class CustomDate {
  year: number;
  month: number;
  day: number;

  constructor(date: Date) {
    this.year = date.getFullYear();
    this.month = date.getMonth() + 1;
    this.day = date.getDate();
  }

  getFullDate() {
    return `${this.year}-${this.month}-${this.day}`;
  }
}

export function birthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formDate = new CustomDate(new Date(control.value));
    const now = new CustomDate(new Date());
    if (1900 <= formDate.year && formDate.year <= now.year) return null;

    return { invalidBirthYear: true };
  };
}
