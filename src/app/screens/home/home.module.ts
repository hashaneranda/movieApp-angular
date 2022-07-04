import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MovieListModule } from '@app/components/movies-list/movie-list.module';
import { SearchModule } from '@app/components/search/search.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, HomeRoutingModule, MovieListModule, SearchModule],
})
export class HomeModule {}
