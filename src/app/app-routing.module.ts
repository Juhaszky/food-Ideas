import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './shared/auth-guard.guard';
import { SettingsComponent } from './settings/settings.component';
import { FoodComponent } from './food-calendar/food/food.component';
import { DayResolver } from './food-calendar/food/day-resolver.service';

const routes: Routes = [
  {
    path: 'login',
    component: AuthPageComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  { path: 'settings', component: SettingsComponent },
  { path: 'food/:date', component: FoodComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    RouterModule.forChild([
      {
        path: 'food/:date',
        component: FoodComponent,
        resolve: { day: DayResolver },
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
