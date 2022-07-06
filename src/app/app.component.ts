import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from './services';
import { User, Role } from './models';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  user: User | any;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.user.subscribe((x) => (this.user = x));
  }

  get isAdmin() {
    return this.user && this.user?.role === Role.Admin;
  }

  logout() {
    this.authenticationService.logout();
  }
}
