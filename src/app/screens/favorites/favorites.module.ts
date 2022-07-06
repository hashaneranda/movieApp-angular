import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FavoritesRoutingModule } from './favorites-routing.module';
import { FavoritesComponent } from './favorites.component';
import { MovieListModule } from '@app/components/movies-list/movie-list.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { initApp } from '@app/app.module';
import { HttpClient } from '@angular/common/http';

@NgModule({
  declarations: [FavoritesComponent],
  imports: [
    CommonModule,
    FavoritesRoutingModule,
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
})
export class FavoritesModule {}
