import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '@app/services';
import { MyErrorStateMatcher } from '@app/helpers/form.helper';

const formConfig = [
  {
    label: 'First Name',
    name: 'firstname',
    type: 'text',
  },
  {
    label: 'Last Name',
    name: 'lastname',
    type: 'text',
  },
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

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
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

    this.registerForm = this.formBuilder.group(formGroupConfig);
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .register(
        this.f?.['username'].value,
        this.f?.['password'].value,
        this.f?.['firstname'].value,
        this.f?.['lastname'].value
      )
      .pipe(first())
      .subscribe({
        next: () => {
          // get return url from query parameters or default to home page
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.error = error;
          this.loading = false;
        },
      });
  }
}
