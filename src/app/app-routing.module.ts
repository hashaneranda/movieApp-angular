import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from '@app/screens/admin';
import { LoginComponent } from '@app/screens/login';
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
    component: LoginComponent,
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
  { path: 'add-movie', loadChildren: () => import('./screens/add-movie/add-movie.module').then(m => m.AddMovieModule) },

  // otherwise redirect to home
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
