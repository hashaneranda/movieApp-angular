import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '@app/models/movie';
import { MoviesService } from '@app/services/movie/movie.service';
import { Location } from '@angular/common';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movie!: Movie;
  user!: User;
  isLoaded: boolean = false;
  gotError: boolean = false;
  hasWatched: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: MoviesService,
    private title: Title,
    private location: Location,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const movieId: any = this.route.snapshot.paramMap.get('movie_id');
    this.user = this.authenticationService.userValue;
    this.getMovie(movieId);
  }

  /**
   * Fetch movie by ID
   * @param id movie ID
   */
  getMovie(id: number) {
    this.service.getMovie(id).subscribe(
      (res: Movie) => {
        this.movie = res;
        console.log(res);
        this.isLoaded = true;
        this.title.setTitle(this.movie.title);

        this.checkMovieWatched();
      },
      (error) => {
        this.gotError = true;
      }
    );
  }

  /**
   * Check if user has already watched the movie
   */
  checkMovieWatched() {
    this.service
      .hasWatchedMovie(this.movie.id, this.user.id)
      .subscribe((res: any) => {
        console.log('res watched', res);
        this.hasWatched = !!res?.isWatched;
      });
  }

  /**
   * Watched movie
   * @param $event event
   */
  watchedCallback($event: any) {
    if ($event?.isWatched) {
      this.hasWatched = true;
    }
  }

  /**
   * Refresh page
   */
  refresh() {
    window.location.reload();
  }

  /**
   * Go back
   */
  goBack() {
    this.location.back();
  }
}
