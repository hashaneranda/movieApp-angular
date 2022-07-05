import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddMovieRoutingModule } from './add-movie-routing.module';
import { AddMovieComponent } from './add-movie.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { initApp } from '@app/app.module';
import { HttpClient } from '@angular/common/http';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [AddMovieComponent],
  imports: [
    CommonModule,
    AddMovieRoutingModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: APP_INITIALIZER,
        useFactory: initApp,
        deps: [HttpClient, TranslateService],
        multi: true,
      },
    }),
    MatInputModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
})
export class AddMovieModule {}
