import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable, take, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { CommentService } from './services';
import { CommentData } from './models';

@UntilDestroy()
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [CommentService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsComponent {
  @Input() recipeId!: number;

  comments$!: Observable<CommentData[]>;

  constructor(private commentService: CommentService) {
  }

  ngOnChanges() {
    this.comments$ = this.commentService.getByReceiptId(this.recipeId)
  }

  deleteComment(id: number) {
    this.commentService.delete(id)
      .pipe(
        take(1),
        tap(() => location.reload()),
        untilDestroyed(this),
      )
      .subscribe();
  }

  createComment(textContent: string) {
    this.commentService.saveByReceiptId(this.recipeId, { text: textContent })
      .pipe(
        take(1),
        tap(() => location.reload()),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
