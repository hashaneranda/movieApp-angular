import {
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services';
import { MoviesService } from '@app/services/movie/movie.service';

@Directive({
  selector: '[watchMovie]',
})
export class WatchMovieDirective {
  @HostListener('click', ['$event']) onClick($event: any) {
    console.info('clicked: ' + $event);
    this.handleWatchLater();
  }

  @Input() movieId!: number;
  @Output() watchedCallback: EventEmitter<any> = new EventEmitter<any>();

  user: User;
  element: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private moviesService: MoviesService,
    el: ElementRef
  ) {
    this.user = this.authenticationService.userValue;
    this.element = el;
  }

  handleWatchLater() {
    if (!this.user) this.router.navigate(['/login']);
    else {
      this.moviesService
        .watchMovie(this.movieId, this.user.id)
        .subscribe((res: any) => {
          if (res) {
            this.element.nativeElement.style.backgroundColor = 'red';
            this.watchedCallback.emit({ isWatched: res?.watchedMovie });
          }
        });
    }
  }
}
