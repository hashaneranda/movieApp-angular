import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GenreResponse, Genres } from '@app/models/movie';
import { MoviesService } from '@app/services/movie/movie.service';

@Component({
  selector: 'genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss'],
})
export class GenreListComponent implements OnInit {
  loading: boolean = false;
  selectedGenre: number[] = [];
  genres: Genres[] = [];

  constructor(
    private moviesService: MoviesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.getGenreList();

    let withGenre = this.route.snapshot.queryParamMap.get('withGenre');
    this.selectedGenre = withGenre ? JSON.parse(withGenre) : this.selectedGenre;
  }

  checkGenre(id: number) {
    return !!this.selectedGenre.find((x) => x === id);
  }

  /**
   * Fetch Genres list
   */
  getGenreList(): void {
    this.moviesService.getGenereList().subscribe((res: GenreResponse) => {
      this.genres = res.genres;
      if (res.genres) this.loading = false;
    });
  }

  onGenereClick(id: number) {
    this.selectedGenre = [...new Set([...this.selectedGenre, id])];

    this.router.navigate(['/movies'], {
      relativeTo: this.route,
      queryParams: {
        genre: JSON.stringify(this.selectedGenre),
      },
      queryParamsHandling: 'merge',
    });
  }
}
