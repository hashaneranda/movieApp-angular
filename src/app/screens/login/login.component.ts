import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/services';
import { MyErrorStateMatcher } from '@app/helpers/form.helper';

const formConfig = [
  {
    label: 'Username',
    name: 'username',
    type: 'text',
  },
  {
    label: 'Password',
    name: 'password',
    type: 'password',
  },
];

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  formConfig: any = formConfig;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.userValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    const formGroupConfig: any = {};

    this.formConfig.map((x: any) => {
      formGroupConfig[x.name] = ['', Validators.required];
    });

    this.loginForm = this.formBuilder.group(formGroupConfig);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .login(this.f?.['username'].value, this.f?.['password'].value)
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);

          window.location.reload();
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
  }
}
