import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { UserService } from '@shared/auth/services';
import { UserData } from '@shared/auth/models';

import { Menu } from '../models';

@Pipe({
  name: 'getMenuPermission'
})
export class MenuPermissionPipe implements PipeTransform {
  private user$: BehaviorSubject<UserData | null> = this.userService.user$;

  constructor(private userService: UserService) { }

  transform(menu: Menu): Observable<boolean> {
    return this.userService.getUserMenus(this.user$.value!.id)
      .pipe(
        map((userMenus) => userMenus.some(item => item.id === menu.id))
      )
  }
}
