import { ElementRef, HostListener } from '@angular/core';
import { Directive } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@app/models';
import { AuthenticationService } from '@app/services';

@Directive({
  selector: '[watchMovie]',
})
export class WatchMovieDirective {
  @HostListener('click', ['$event']) onClick($event: any) {
    console.info('clicked: ' + $event);
    this.handleWatchLater();
  }

  user: User;
  element: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    el: ElementRef
  ) {
    this.user = this.authenticationService.userValue;
    this.element = el;
  }

  handleWatchLater() {
    if (!this.user) this.router.navigate(['/login']);
    else this.element.nativeElement.style.backgroundColor = 'red';
  }
}
