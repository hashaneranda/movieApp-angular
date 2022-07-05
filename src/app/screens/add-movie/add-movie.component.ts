import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

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
    type: 'text',
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

  constructor(private location: Location, private formBuilder: FormBuilder) {}

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

    // // stop here if form is invalid
    // if (this.loginForm.invalid) {
    //   return;
    // }

    // this.loading = true;
    // this.authenticationService
    //   .login(this.f?.['username'].value, this.f?.['password'].value)
    //   .pipe(first())
    //   .subscribe({
    //     next: () => {
    //       // get return url from query parameters or default to home page
    //       const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //       this.router.navigateByUrl(returnUrl);

    //       window.location.reload();
    //     },
    //     error: (error) => {
    //       this.error = error;
    //       this.loading = false;
    //     },
    //   });
  }

  /**
   * Go back
   */
  goBack() {
    this.location.back();
  }
}
