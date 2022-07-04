import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'movie-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  searchForm!: FormGroup;
  loading = false;
  submitted = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: [
        this.route.snapshot.queryParamMap.get('search') || '',
        // Validators.required,
      ],
    });
  }

  get f() {
    return this.searchForm.controls;
  }

  onSearch() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.searchForm.invalid) {
      return;
    }

    this.router.navigate(['/movies'], {
      relativeTo: this.route,
      queryParams: { search: this.f?.['search'].value },
      queryParamsHandling: 'merge',
    });
  }
}
