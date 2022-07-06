import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {
  MovieListResponse,
  Movie,
  GenreResponse,
  ReviewListResponse,
} from '@app/models/movie';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private _baseUrl: string = 'https://api.themoviedb.org/3';
  private _apiKey: string = environment.API_KEY;

  constructor(private http: HttpClient) {}

  /**
   * Fetch movie list
   * @param page Pagination number
   * @returns Movie[]
   */
  getMoviesList(
    page: number,
    objParam: any = {}
  ): Observable<MovieListResponse> {
    const withGenre = objParam?.withGenre
      ? JSON.parse(objParam?.withGenre)
      : '';

    let params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('page', page)
      .set('with_genres', String(withGenre) || '');
    // .set('without_genres', String(withOutGenre) || '');
    return this.http.get<MovieListResponse>(`${this._baseUrl}/discover/movie`, {
      params: params,
    });
  }

  /**
   * Fetch movie by ID
   * @param movieId movie ID
   * @returns Movie
   */
  getMovie(movieId: number): Observable<Movie> {
    let movieDB: any = localStorage.getItem('movieDB');

    try {
      if (movieDB) movieDB = JSON.parse(movieDB);
    } catch (error) {
      console.log('error parsing');
    }

    movieDB = movieDB ?? [];

    const localMovie = movieDB.find((x: Movie) => x.id === Number(movieId));

    console.log('localMovie', localMovie, movieDB, movieId);

    if (localMovie) return of(localMovie);

    let params = new HttpParams().set('api_key', this._apiKey);
    return this.http.get<Movie>(`${this._baseUrl}/movie/${movieId}`, {
      params: params,
    });
  }

  /**
   * Search movies
   * @param query search query
   * @returns
   */
  searchMovies(query: string): Observable<MovieListResponse> {
    let params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('query', query);

    return this.http.get<MovieListResponse>(`${this._baseUrl}/search/movie`, {
      params: params,
    });
  }

  /**
   * Fetch Genres
   * @returns
   */
  getGenereList(): Observable<GenreResponse> {
    let params = new HttpParams().set('api_key', this._apiKey);

    return this.http.get<GenreResponse>(`${this._baseUrl}/genre/movie/list`, {
      params: params,
    });
  }

  /**
   * Fetch Genres
   * @returns
   */
  getReviewList(movie: number): Observable<ReviewListResponse> {
    let params = new HttpParams().set('api_key', this._apiKey);

    return this.http.get<ReviewListResponse>(
      `${this._baseUrl}/movie/${movie}/reviews`,
      {
        params: params,
      }
    );
  }

  /**
   * Add movie
   * @param movie movie object
   * @returns
   */
  addMovie(movie: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/add-movie`, {
      ...movie,
    });
  }

  /**
   * Fetch recent movie
   * @returns
   */
  getRecentMovies(): Observable<MovieListResponse> {
    let movieDB: any = localStorage.getItem('movieDB');

    try {
      if (movieDB) movieDB = JSON.parse(movieDB);
    } catch (error) {
      console.log('error parsing');
    }

    movieDB = movieDB ?? [];

    return of({
      page: 1,
      total_pages: 10,
      results: movieDB,
    });
  }
}
