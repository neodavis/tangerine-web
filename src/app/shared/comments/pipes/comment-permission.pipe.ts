import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { UserService } from '@shared/auth/services';
import { UserData } from '@shared/auth/models';

import { CommentData } from '../models';

@Pipe({
  name: 'getCommentPermission'
})
export class CommentPermissionPipe implements PipeTransform {
  private user$: BehaviorSubject<UserData | null> = this.userService.user$;

  constructor(private userService: UserService) { }

  transform(comment: CommentData): boolean {
    return this.user$.value!.id === comment.authorId;
  }
}
