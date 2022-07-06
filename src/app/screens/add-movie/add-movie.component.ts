import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MyErrorStateMatcher } from '@app/helpers/form.helper';
import { MoviesService } from '@app/services/movie/movie.service';
import { Router } from '@angular/router';

/** Error when invalid control is dirty, touched, or submitted. */

const formConfig = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
  },
  {
    label: 'Title',
    name: 'title',
    type: 'text',
  },
  {
    label: 'Description',
    name: 'description',
    type: 'text',
  },
  {
    label: 'IMDB rating',
    name: 'rating',
    type: 'number',
  },
  {
    label: 'Language',
    name: 'language',
    type: 'text',
  },
  {
    label: 'Genre',
    name: 'genre',
    type: 'text',
  },
  {
    label: 'Image',
    name: 'image',
    type: 'text',
  },
];

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss'],
})
export class AddMovieComponent implements OnInit {
  movieForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  movieFormConfig = formConfig;
  matcher = new MyErrorStateMatcher();

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private moviesService: MoviesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const formGroupConfig: any = {};

    this.movieFormConfig.map((x) => {
      formGroupConfig[x.name] = ['', Validators.required];
    });

    this.movieForm = this.formBuilder.group(formGroupConfig);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.movieForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.movieForm.invalid) {
      return;
    }

    const movieObj = {
      name: this.f?.['name'].value,
      title: this.f?.['title'].value,
      description: this.f?.['description'].value,
      rating: this.f?.['rating'].value,
      language: this.f?.['language'].value,
      genre: this.f?.['genre'].value,
      image: this.f?.['image'].value,
    };

    this.loading = true;
    this.moviesService
      .addMovie(movieObj)
      .pipe(first())
      .subscribe({
        next: (movie) => {
          // get return url from query parameters or default to home page
          this.router.navigate([`movie/${movie.id}`]);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
  }

  /**
   * Go back
   */
  goBack() {
    this.location.back();
  }
}
