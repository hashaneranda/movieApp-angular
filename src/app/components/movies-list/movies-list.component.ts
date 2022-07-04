import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Movie, MovieListResponse } from '@app/models/movie';
import { MoviesService } from '@app/services/movie/movie.service';

@Component({
  selector: 'movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss'],
})
export class MoviesListComponent implements OnInit {
  loading: boolean = true;
  movies: Movie[] = [];
  total_pages: number = 0;
  searchQuery = '';

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: any) => {
      if (!!queryParams) {
        const { search, genre, withOutGenre } = queryParams;
        console.log('search', search);
        this.searchQuery = search;
        if (search) this.getMovieListByQuery(search);
        else if (genre) this.getMovieList({ withGenre: genre });
        else this.getMovieList({});
      }
    });
  }

  /**
   * Fetch movies list
   */
  getMovieList(paramData: any): void {
    this.moviesService
      .getMoviesList(1, paramData)
      .subscribe((res: MovieListResponse) => {
        this.movies = res.results;
        this.total_pages = res.total_pages;
        console.log(res);
        window.scroll(0, 0);

        // this.movies = movie.data.movies;
        // console.log(this.movies);
        if (res.results) this.loading = false;
      });
  }

  /**
   * Fetch movies list by query
   */
  getMovieListByQuery(query: string): void {
    this.moviesService
      .searchMovies(query)
      .subscribe((res: MovieListResponse) => {
        console.log('res', res);

        this.movies = res.results;
        this.total_pages = res.total_pages;
        console.log(res);
        window.scroll(0, 0);

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
