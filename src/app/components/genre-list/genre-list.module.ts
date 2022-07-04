import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

import { GenreListComponent } from './genre-list.component';

@NgModule({
  declarations: [GenreListComponent],
  imports: [CommonModule, MatChipsModule],
  exports: [GenreListComponent],
})
export class GenreListModule {}
