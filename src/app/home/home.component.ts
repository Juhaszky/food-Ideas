import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup } from '@angular/forms';
import { HomeService } from './home.service';
import { Subscription } from 'rxjs';
import { LoaderService } from '../shared/common/loader/loader.service';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [CdkDrag],
})
export class HomeComponent implements OnInit, OnDestroy {
  selected!: Date | null;
  nickName!: string;
  subscriptions: Subscription[] = [];
  loading: boolean = true;
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private homeService: HomeService,
    private loaderService: LoaderService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  private _mobileQueryListener: () => void;
  mobileQuery!: MediaQueryList;
  campaignOne = new FormGroup({
    start: new FormControl(new Date(year, month, 13)),
    end: new FormControl(new Date(year, month, 16)),
  });
  ngOnInit() {
    this.loaderService.showLoader();
    setTimeout(() => {
      this.loaderService.hideLoader();
      this.loading = false;
    }, 700);
    this.nickName = this.homeService.getNickName();
    const nickNameSubscription = this.homeService.nickNameSubject.subscribe(
      name => (this.nickName = name)
    );
    this.subscriptions.push(nickNameSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subs => subs.unsubscribe());
    //this.homeService.nickNameSubject.unsubscribe();
  }
}
