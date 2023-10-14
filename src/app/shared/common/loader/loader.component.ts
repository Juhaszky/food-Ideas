import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './loader.service';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit, OnDestroy {
  loading = false;
  private subscription!: Subscription;
  constructor(private loadingService: LoaderService) {}
  ngOnInit(): void {
    this.subscription = this.loadingService.loading.subscribe(
      loading => (this.loading = loading)
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
