import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewListComponent } from './review-list.component';

@NgModule({
  declarations: [ReviewListComponent],
  imports: [CommonModule],
  exports: [ReviewListComponent],
})
export class ReviewListModule {}
