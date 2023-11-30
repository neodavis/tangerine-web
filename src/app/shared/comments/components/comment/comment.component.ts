import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { CommentData } from '../../models'

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['comment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentComponent {
  @Input() comment!: CommentData;
  @Output() deleted = new EventEmitter<number>()

  handleImageError(event: ErrorEvent) {
    (event.target as HTMLImageElement).src = 'assets/empty-user-image.webp';
    (event.target as HTMLImageElement).alt = 'No Image Available';
  }
}
