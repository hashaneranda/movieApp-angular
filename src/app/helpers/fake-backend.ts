import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

import { User, Role } from '@app/models';

const defaultUsers: User[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin',
    firstName: 'Admin',
    lastName: 'User',
    role: Role.Admin,
  },
  {
    id: 2,
    username: 'user',
    password: 'user',
    firstName: 'Jhon',
    lastName: 'Doe',
    role: Role.User,
  },
];

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const { url, method, headers, body, params } = request;

    let userDb: any = localStorage.getItem('userDB');

    try {
      if (userDb) userDb = JSON.parse(userDb);
    } catch (error) {
      console.log('error parsing');
    }

    userDb = userDb ?? [];

    const users = [...userDb, ...defaultUsers];

    let movieDB: any = localStorage.getItem('movieDB');

    try {
      if (movieDB) movieDB = JSON.parse(movieDB);
    } catch (error) {
      console.log('error parsing');
    }

    movieDB = movieDB ?? [];

    let reviewDb: any = localStorage.getItem('reviewDb');

    try {
      if (reviewDb) reviewDb = JSON.parse(reviewDb);
    } catch (error) {
      console.log('error parsing');
    }

    reviewDb = reviewDb ?? [];

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/authenticate') && method === 'POST':
          return authenticate();
        case url.endsWith('/users') && method === 'GET':
          return getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return getUserById();
        case url.endsWith('/add-movie') && method === 'POST':
          return addMovie();
        case url.endsWith('/add-review') && method === 'POST':
          return addReview();
        case url.endsWith('/watch-later') && method === 'POST':
          return addWatchLater();
        case url.endsWith('/watch-later') && method === 'GET':
          return getWatchLater();
        case url.endsWith('/favorite') && method === 'POST':
          return addFavorite();
        case url.endsWith('/favorite') && method === 'GET':
          return getFavorite();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }

    // route functions

    function authenticate() {
      const { username, password } = body;
      const user = users.find(
        (x) => x.username === username && x.password === password
      );
      if (!user) return error('Username or password is incorrect');
      return ok({
        id: user.id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        token: `fake-jwt-token.${user.id}`,
      });
    }

    function getUsers() {
      if (!isAdmin()) return unauthorized();
      return ok(users);
    }

    function getUserById() {
      if (!isLoggedIn()) return unauthorized();

      // only admins can access other user records
      if (!isAdmin() && currentUser().id !== idFromUrl()) return unauthorized();

      const user = users.find((x) => x.id === idFromUrl());
      return ok(user);
    }

    // helper functions

    function ok(body: any) {
      return of(new HttpResponse({ status: 200, body })).pipe(delay(500)); // delay observable to simulate server api call
    }

    function unauthorized() {
      return throwError({
        status: 401,
        error: { message: 'unauthorized' },
      }).pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    }

    function error(message: any) {
      return throwError({ status: 400, error: { message } }).pipe(
        materialize(),
        delay(500),
        dematerialize()
      );
    }

    function isLoggedIn() {
      const authHeader = headers.get('Authorization') || '';
      return authHeader.startsWith('Bearer fake-jwt-token');
    }

    function isAdmin() {
      return isLoggedIn() && currentUser().role === Role.Admin;
    }

    function currentUser(): any {
      if (!isLoggedIn()) return null;

      const authorization = headers.get('Authorization') as any;

      const id = authorization ? parseInt(authorization.split('.')[1]) : '';
      return users.find((x) => x.id === id);
    }

    function idFromUrl() {
      const urlParts = url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    }

    function addMovie() {
      const { name, title, description, rating, language, genre, image } = body;

      const movieNew = {
        adult: false,
        id: new Date().getTime(),
        original_language: language,
        original_title: title,
        overview: description,
        poster_path: image,
        release_date: new Date().toISOString().split('T')[0],
        title: title,
        vote_average: rating,
        genres: [
          {
            id: 1,
            name: genre,
          },
        ],
        isWishlisted: false,
      };

      localStorage.setItem('movieDB', JSON.stringify([...movieDB, movieNew]));

      return ok(movieNew);
    }

    function addReview() {
      const { review, user, movie } = body;

      const reviewNew = {
        review,
        user,
        movie,
        date: new Date(),
      };

      localStorage.setItem(
        'reviewDb',
        JSON.stringify([...reviewDb, reviewNew])
      );

      return ok(reviewNew);
    }

    function addFavorite() {
      const { user, movie } = body;

      const data = {
        user,
        movie,
        date: new Date(),
      };

      let favoriteDb: any = localStorage.getItem('favoriteDb');

      try {
        if (favoriteDb) favoriteDb = JSON.parse(favoriteDb);
      } catch (error) {
        console.log('error parsing');
      }

      favoriteDb = favoriteDb ?? [];

      localStorage.setItem('favoriteDb', JSON.stringify([...favoriteDb, data]));

      return ok(data);
    }

    function getFavorite() {
      const user = params.get('user');

      let favoriteDb: any = localStorage.getItem('favoriteDb');

      try {
        if (favoriteDb) favoriteDb = JSON.parse(favoriteDb);
      } catch (error) {
        console.log('error parsing');
      }

      favoriteDb = favoriteDb ?? [];

      const data = favoriteDb.filter((x: any) => x.user === Number(user));

      return ok(data);
    }

    function addWatchLater() {
      const { user, movie } = body;

      const data = {
        user,
        movie,
        date: new Date(),
      };

      let watchLaterDb: any = localStorage.getItem('watchLaterDb');

      try {
        if (watchLaterDb) watchLaterDb = JSON.parse(watchLaterDb);
      } catch (error) {
        console.log('error parsing');
      }

      watchLaterDb = watchLaterDb ?? [];

      localStorage.setItem(
        'watchLaterDb',
        JSON.stringify([...watchLaterDb, data])
      );

      return ok(data);
    }

    function getWatchLater() {
      const user = params.get('user');

      let watchLaterDb: any = localStorage.getItem('watchLaterDb');

      try {
        if (watchLaterDb) watchLaterDb = JSON.parse(watchLaterDb);
      } catch (error) {
        console.log('error parsing');
      }

      watchLaterDb = watchLaterDb ?? [];

      const data = watchLaterDb.filter((x: any) => x.user === Number(user));

      return ok(data);
    }
  }
}

export const fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true,
};
