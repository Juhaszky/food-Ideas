import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { SettingsComponent } from 'src/app/settings/settings.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger;
  navItems = [
    {
      name: 'HomePage',
      routerLink: '',
    },
    {
      name: 'Food-Generator',
      routerLink: '/generator',
    },
    {
      name: 'Help',
      routerLink: '/help',
    },
  ];
  constructor(
    private router: Router,
    public dialog: MatDialog,
  ) {}
  onLogout() {
    localStorage.removeItem('loggedIn');
    this.router.navigate(['/login']);
  }

  toSettings() {
    const dialogRef = this.dialog.open(SettingsComponent, {
      height: '80%',
      width: '80%',
      restoreFocus: true,
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
}
