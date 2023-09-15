import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup } from '@angular/forms';
import { HomeService } from './home.service';

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
  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private homeService: HomeService,
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
    this.nickName = this.homeService.getNickName();
    this.homeService.nickNameSubject.subscribe(
      (name) => (this.nickName = name),
    );
  }

  ngOnDestroy(): void {
    this.homeService.nickNameSubject.unsubscribe();
  }
}
