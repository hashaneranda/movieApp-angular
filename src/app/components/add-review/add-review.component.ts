import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyErrorStateMatcher } from '@app/helpers/form.helper';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services';
import { MoviesService } from '@app/services/movie/movie.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.scss'],
})
export class AddReviewComponent implements OnInit {
  @Input()
  movieId!: number;
  user!: User;

  reviewForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private authenticationService: AuthenticationService
  ) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    this.reviewForm = this.formBuilder.group({
      review: ['', Validators.required],
    });
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.reviewForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.reviewForm.invalid) {
      return;
    }

    this.loading = true;
    this.moviesService
      .addReview(this.f?.['review'].value, this.movieId, this.user.id)
      .pipe(first())
      .subscribe({
        next: (movie) => {
          window.location.reload();
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
  }
}
