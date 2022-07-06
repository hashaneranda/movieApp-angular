import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models';
import { Movie } from '@app/models/movie';
import { AuthenticationService } from '@app/services';
import { MoviesService } from '@app/services/movie/movie.service';

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.scss'],
})
export class WatchLaterComponent implements OnInit {
  user!: User;
  loading: boolean = true;
  movies: Movie[] = [];
  total_pages: number = 0;

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    this.getMovieList();
  }

  /**
   * Fetch movies list
   */
  getMovieList(): void {
    this.moviesService.getWatchLater(this.user.id).subscribe((res: any) => {
      if (res) {
        this.movies = res.map((x: any) => x.movie);
        this.loading = false;
      }
    });
  }

  /**
   *
   * @param id movie ID
   */
  viewDetails(id: number) {
    this.router.navigate(['/movie/' + id]);
  }
}
