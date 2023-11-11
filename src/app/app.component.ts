import { Component, OnInit } from '@angular/core';
import { LoaderService } from './shared/common/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoaderService]
})
export class AppComponent implements OnInit {
  title = 'food-Ideas';

  ngOnInit(): void {
    
  }
}
