import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserService } from '@app/services';
import { first } from 'rxjs/operators';

import { User, Role } from '@app/models';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit {
  loading = false;
  user!: User;
  userFromApi: User | any;

  get isAdmin() {
    return this.user && this.user?.role === Role.Admin;
  }

  get isPrime() {
    return this.user && this.user?.role === Role.Prime;
  }

  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService
  ) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit() {
    this.loading = true;
    this.userService
      .getById(this.user.id)
      .pipe(first())
      .subscribe((user) => {
        this.loading = false;
        this.userFromApi = user;
      });
  }

  /**
   * Logout user
   */
  logout() {
    this.authenticationService.logout();
    window.location.reload();
  }

  /**
   * Change language
   * @param code language code
   */
  changeLanguage(code: string, e: any) {
    e.preventDefault();
    localStorage.setItem('locale', code);
    window.location.reload();
  }
}
