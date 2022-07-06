import { HttpClient } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { initApp } from '@app/app.module';
import { GenreListModule } from '@app/components/genre-list/genre-list.module';
import { MovieListModule } from '@app/components/movies-list/movie-list.module';
import { SearchModule } from '@app/components/search/search.module';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { MovieComponent } from './movie.component';

describe('MovieComponent', () => {
  let component: MovieComponent;
  let fixture: ComponentFixture<MovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MovieComponent],
      imports: [
        TranslateModule.forRoot({
          loader: {
            provide: APP_INITIALIZER,
            useFactory: initApp,
            deps: [HttpClient, TranslateService],
            multi: true,
          },
        }),
        MovieListModule,
        SearchModule,
        GenreListModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
