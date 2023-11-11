import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

@Injectable()
export class LoaderService {
  private _globalSpinner$ = new BehaviorSubject(false);
  public globalSpinner$ = this._globalSpinner$.asObservable();
  private _spinnerCount = 0;

  constructor() {}
  showLoader(): void {
    this._spinnerCount++;
    this._globalSpinner$.next(true);
  }
  hideLoader(): void {
    this._spinnerCount--;
    if (this._spinnerCount <= 0) this.resetLoader();
  }
  resetLoader() {
    this._spinnerCount = 0;
    this._globalSpinner$.next(false);
  }
}
