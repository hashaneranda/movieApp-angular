import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '@app/models/movie';
import { MoviesService } from '@app/services/movie/movie.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  movie!: Movie;
  isLoaded: boolean = false;
  gotError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private service: MoviesService,
    private title: Title,
    private location: Location
  ) {}

  ngOnInit(): void {
    const movieId: any = this.route.snapshot.paramMap.get('movie_id');
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
      },
      (error) => {
        this.gotError = true;
      }
    );
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
