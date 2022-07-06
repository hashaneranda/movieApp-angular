import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movie, MovieListResponse } from '@app/models/movie';
import { MoviesService } from '@app/services/movie/movie.service';

@Component({
  selector: 'recent-movies',
  templateUrl: './recent-movies.component.html',
  styleUrls: ['./recent-movies.component.scss'],
})
export class RecentMoviesComponent implements OnInit {
  loading: boolean = true;
  movies: Movie[] = [];
  total_pages: number = 0;
  searchQuery = '';

  get hasMovies() {
    return this.movies.length > 0;
  }

  constructor(private moviesService: MoviesService, private router: Router) {}

  ngOnInit(): void {
    this.getMovieList();
  }

  /**
   * Fetch movies list
   */
  getMovieList(): void {
    this.moviesService.getRecentMovies().subscribe((res: MovieListResponse) => {
      this.movies = res.results;
      this.total_pages = res.total_pages;
      console.log(res);

      // this.movies = movie.data.movies;
      // console.log(this.movies);
      if (res.results) this.loading = false;
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
