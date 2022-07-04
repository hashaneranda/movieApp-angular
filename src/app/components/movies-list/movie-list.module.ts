import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesListComponent } from './movies-list.component';
import { MovieCardComponent } from '../movie-card/movie-card.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MoviesListComponent, MovieCardComponent],
  imports: [CommonModule, RouterModule],
  exports: [MoviesListComponent, MovieCardComponent],
})
export class MovieListModule {}
