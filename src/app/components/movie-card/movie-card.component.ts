import { Component, Input, OnInit } from '@angular/core';
import { Genres } from '@app/models/movie';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() summary?: any;
  @Input() year?: number;
  @Input() title?: string;
  @Input() coverImg?: any;
  @Input() id?: number;
  @Input() genres?: Genres[];

  constructor() {}

  ngOnInit(): void {}
}
