import { ElementRef, HostListener, Input } from '@angular/core';
import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services';
import { MoviesService } from '@app/services/movie/movie.service';

@Directive({
  selector: '[watchLater]',
})
export class WatchLaterDirective {
  @HostListener('click', ['$event']) onClick($event: any) {
    console.info('clicked: ' + $event);
    this.handleWatchLater();
  }

  @Input() movieId!: number;
  user: User;
  element: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    el: ElementRef,
    private moviesService: MoviesService
  ) {
    this.user = this.authenticationService.userValue;
    this.element = el;
  }

  handleWatchLater() {
    if (!this.user) this.router.navigate(['/login']);
    else {
      this.moviesService
        .addWatchLater(this.movieId, this.user.id)
        .subscribe((res: any) => {
          if (res) {
            this.element.nativeElement.style.backgroundColor = 'red';
          }
        });
    }
  }
}
