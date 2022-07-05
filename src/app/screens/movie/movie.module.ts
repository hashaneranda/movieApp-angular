import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieRoutingModule } from './movie-routing.module';
import { MovieComponent } from './movie.component';
import { MovieListModule } from '@app/components/movies-list/movie-list.module';
import { SearchModule } from '@app/components/search/search.module';
import { GenreListModule } from '@app/components/genre-list/genre-list.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { initApp } from '@app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [MovieComponent],
  imports: [
    CommonModule,
    MovieRoutingModule,
    MovieListModule,
    SearchModule,
    GenreListModule,
    TranslateModule.forChild({
      loader: {
        provide: APP_INITIALIZER,
        useFactory: initApp,
        deps: [HttpClient, TranslateService],
        multi: true,
      },
    }),
  ],
})
export class MovieModule {}
