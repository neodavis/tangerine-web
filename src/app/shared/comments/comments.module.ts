import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { TranslateModule } from '@ngx-translate/core';

import { CommentComponent } from './components';
import { CommentPermissionPipe } from './pipes';
import { CommentsComponent } from './comments.component';

@NgModule({
  declarations: [CommentsComponent, CommentComponent, CommentPermissionPipe],
  imports: [CommonModule, TranslateModule.forChild(), NgOptimizedImage],
  exports: [CommentsComponent]
})
export class CommentsModule { }
