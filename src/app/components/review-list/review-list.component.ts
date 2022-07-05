import { Component, Input, OnInit } from '@angular/core';
import { Review, ReviewListResponse } from '@app/models/movie';
import { MoviesService } from '@app/services/movie/movie.service';

@Component({
  selector: 'review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
})
export class ReviewListComponent implements OnInit {
  loading: boolean = true;
  reviews: Review[] = [];

  @Input()
  movieId!: number;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    if (this.movieId) {
      this.getReviewList(this.movieId);
    }
  }

  /**
   * Fetch Review list
   */
  getReviewList(movie: number): void {
    this.moviesService
      .getReviewList(movie)
      .subscribe((res: ReviewListResponse) => {
        this.reviews = res.results;
        console.log(res);

        // this.movies = movie.data.movies;
        // console.log(this.movies);
        if (res.results) this.loading = false;
      });
  }
}
