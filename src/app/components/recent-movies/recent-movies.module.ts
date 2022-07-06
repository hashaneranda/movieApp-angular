import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecentMoviesComponent } from './recent-movies.component';
import { RouterModule } from '@angular/router';
import { MovieListModule } from '../movies-list/movie-list.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { initApp } from '@app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [RecentMoviesComponent],
  imports: [
    CommonModule,
    RouterModule,
    MovieListModule,
    TranslateModule.forChild({
      loader: {
        provide: APP_INITIALIZER,
        useFactory: initApp,
        deps: [HttpClient, TranslateService],
        multi: true,
      },
    }),
  ],
  exports: [RecentMoviesComponent],
})
export class RecentMoviesModule {}
