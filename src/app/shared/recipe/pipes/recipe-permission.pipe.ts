import { Pipe, PipeTransform } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

import { UserService } from '@shared/auth/services';
import { UserData } from '@shared/auth/models';

import { Recipe } from '../models';

@Pipe({
  name: 'getRecipePermission'
})
export class RecipePermissionPipe implements PipeTransform {
  private user$: BehaviorSubject<UserData | null> = this.userService.user$;

  constructor(private userService: UserService) { }

  transform(recipe: Recipe): Observable<boolean> {
    return this.userService.getUserRecipes(this.user$.value!.id)
      .pipe(
        map((userRecipes) => userRecipes.some(item => item.id === recipe.id))
      )
  }
}
