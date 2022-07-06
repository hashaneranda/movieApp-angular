import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from '@app/screens/admin';
import { AuthGuard } from '@app/helpers';
import { Role } from '@app/models';
import { MovieDetailComponent } from './screens/movie-detail/movie-detail.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./screens/home/home.module').then((m) => m.HomeModule),
    // canActivate: [AuthGuard],
  },
  {
    path: 'movie/:movie_id',
    component: MovieDetailComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./screens/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./screens/register/register.module').then(
        (m) => m.RegisterModule
      ),
  },
  {
    path: 'movies',
    loadChildren: () =>
      import('./screens/movie/movie.module').then((m) => m.MovieModule),
  },
  {
    path: 'add-movie',
    loadChildren: () =>
      import('./screens/add-movie/add-movie.module').then(
        (m) => m.AddMovieModule
      ),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] },
  },
  {
    path: 'favorites',
    loadChildren: () =>
      import('./screens/favorites/favorites.module').then(
        (m) => m.FavoritesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'watch-later',
    loadChildren: () =>
      import('./screens/watch-later/watch-later.module').then(
        (m) => m.WatchLaterModule
      ),
    canActivate: [AuthGuard],
  },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
