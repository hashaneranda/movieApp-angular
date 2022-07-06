import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { Role, User } from '@app/models';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private userSubject: BehaviorSubject<any>;
  public user: Observable<User>;

  constructor(private router: Router, private http: HttpClient) {
    let userData = localStorage.getItem('user') as any;

    if (userData) userData = JSON.parse(userData);

    this.userSubject = new BehaviorSubject<User>(userData);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(username: string, password: string) {
    return this.http
      .post<any>(`${environment.apiUrl}/users/authenticate`, {
        username,
        password,
      })
      .pipe(
        map((user) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('user', JSON.stringify(user));
          this.userSubject.next(user);
          return user;
        })
      );
  }

  /**
   *  handle register user
   * @param username
   * @param password
   * @param firstname
   * @param lastname
   * @returns
   */
  register(
    username: string,
    password: string,
    firstname: string,
    lastname: string
  ) {
    const user = {
      id: new Date().getTime(),
      username,
      password,
      firstName: firstname,
      lastName: lastname,
      role: Role.User,
    };

    let userDb: any = localStorage.getItem('userDB');

    try {
      if (userDb) userDb = JSON.parse(userDb);
    } catch (error) {
      console.log('error parsing');
    }

    userDb = userDb ?? [];

    localStorage.setItem('userDB', JSON.stringify([...userDb, user]));
    localStorage.setItem('user', JSON.stringify(user));
    this.userSubject.next(user);

    return of(user);
  }

  /**
   * Handle upgrade to prime
   * @param userID user ID
   */
  upgradeToPrime(userID: number) {
    let userDb: any = localStorage.getItem('userDB');

    try {
      if (userDb) userDb = JSON.parse(userDb);
    } catch (error) {
      console.log('error parsing');
    }

    userDb = userDb ?? [];

    const newUserDb = userDb.map((x: User) => {
      if (x.id === userID) x.role = Role.Prime;
      return x;
    });

    localStorage.setItem('userDB', JSON.stringify(newUserDb));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }
}
