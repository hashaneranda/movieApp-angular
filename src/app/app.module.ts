import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// used to create fake backend
import { fakeBackendProvider } from '@app/helpers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from '@app/helpers';
import { AdminComponent } from '@app/screens/admin';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { MovieDetailComponent } from './screens/movie-detail/movie-detail.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { catchError, of, forkJoin } from 'rxjs';
import { ReviewListModule } from './components/review-list/review-list.module';
import { WatchLaterDirective } from './directives/watch-later/watch-later.directive';
import { AddFavoriteDirective } from './directives/add-favorite/add-favorite.directive';
import { WatchMovieDirective } from './directives/watch-movie/watch-movie.directive';
import { MovieImageResolverPipe } from './pipes/movie-image-resolver/movie-image-resolver.pipe';
import { AddReviewModule } from './components/add-review/add-review.module';

export function initApp(http: HttpClient, translate: TranslateService) {
  return () =>
    new Promise<boolean>((resolve: (res: boolean) => void) => {
      const defaultLocale = 'en';
      const translationsUrl = '/assets/i18n/translations';
      const sufix = '.json';
      const storageLocale = localStorage.getItem('locale');
      const locale = storageLocale || defaultLocale;

      forkJoin([
        http.get(`/assets/i18n/dev.json`).pipe(catchError(() => of(null))),
        http
          .get(`${translationsUrl}/${locale}${sufix}`)
          .pipe(catchError(() => of(null))),
      ]).subscribe((response: any[]) => {
        const devKeys = response[0];
        const translatedKeys = response[1];

        translate.setTranslation(defaultLocale, devKeys || {});
        translate.setTranslation(locale, translatedKeys || {}, true);

        translate.setDefaultLang(defaultLocale);
        translate.use(locale);

        resolve(true);
      });
    });
}
@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    TranslateModule.forRoot(),
    ReviewListModule,
    AddReviewModule,
  ],
  declarations: [
    AppComponent,
    AdminComponent,
    NavBarComponent,
    MovieDetailComponent,
    WatchLaterDirective,
    AddFavoriteDirective,
    WatchMovieDirective,
    MovieImageResolverPipe,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider,

    {
      provide: APP_INITIALIZER,
      useFactory: initApp,
      deps: [HttpClient, TranslateService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
