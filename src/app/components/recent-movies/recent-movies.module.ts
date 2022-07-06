import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentMoviesComponent } from './recent-movies.component';
import { RouterModule } from '@angular/router';
import { MovieListModule } from '../movies-list/movie-list.module';

@NgModule({
  declarations: [RecentMoviesComponent],
  imports: [CommonModule, RouterModule, MovieListModule],
  exports: [RecentMoviesComponent],
})
export class RecentMoviesModule {}
