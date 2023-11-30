import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { BehaviorSubject, map, Observable } from 'rxjs';

import { UserService } from '@shared/auth/services';
import { UserData, UserRole } from '@shared/auth/models';
import {
  IngredientEditDialogComponent,
  MenuEditDialogComponent,
  RecipeEditDialogComponent,
  SignInDialogComponent,
  SignUpDialogComponent
} from '@shared/dialogs/components';
import { UserEditDialogComponent } from '@shared/dialogs/components/user-edit-dialog/user-edit-dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  user$: BehaviorSubject<UserData | null> = this.userService.user$;
  hasAdminPermission$: Observable<boolean> = this.userService.hasAdminPermission$;
  isGuest$: Observable<boolean> = this.userService.user$
    .pipe(
      map((user: UserData | null) => !user),
    );

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
  ) { }

  openSignInDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(SignInDialogComponent);
  }

  openSignUpDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(SignUpDialogComponent);
  }

  openSignOutDialog(): void {
    localStorage.removeItem('jwtToken');
    this.userService.user$.next(null);
  }

  openMenuCreateDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(MenuEditDialogComponent);
  }

  openRecipeCreateDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(RecipeEditDialogComponent);
  }

  openIngredientCreateDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(IngredientEditDialogComponent);
  }

  openSettingsDialog() {
    this.dialog.closeAll();
    this.dialog.open(UserEditDialogComponent, { data: { id: this.user$.value?.id } })
  }
}
