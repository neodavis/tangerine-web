import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { IngredientEditDialogComponent } from '@shared/dialogs/components';
import { IngredientService } from '@shared/ingredient/services';
import { Ingredient } from '@shared/ingredient/models';
import { UserService } from '@shared/auth/services';

@Component({
  templateUrl: './ingredients-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [IngredientService],
})
export class IngredientsListPageComponent implements OnInit {
  collection$: Observable<Ingredient[]> = this.ingredientService.getAll()
    .pipe(
      finalize(() => this.loading$.next(false))
    );
  hasAdminPermission$: Observable<boolean> = this.userService.hasAdminPermission$;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private ingredientService: IngredientService,
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loading$.next(true);
  }

  openIngredientsEditDialog(id: number): void {
    this.dialog.closeAll();
    this.dialog.open(IngredientEditDialogComponent, {data: {id}})
  }

  handleImageError(event: ErrorEvent) {
    (event.target as HTMLImageElement).src = 'assets/empty-image.jpg';
    (event.target as HTMLImageElement).alt = 'No Image Available';
  }
}
