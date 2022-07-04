import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { MovieListModule } from '@app/components/movies-list/movie-list.module';
import { SearchModule } from '@app/components/search/search.module';
import { GenreListModule } from '@app/components/genre-list/genre-list.module';

@NgModule({
  declarations: [MovieComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    MovieListModule,
    SearchModule,
    GenreListModule,
  ],
})
export class MovieModule {}
