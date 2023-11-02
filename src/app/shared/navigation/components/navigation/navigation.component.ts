import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { map, Observable } from 'rxjs';

import { AuthService } from '@shared/auth/services';
import { User, UserRole } from '@shared/auth/models';
import {
  MenuEditDialogComponent,
  ReceiptEditDialogComponent,
  SignInDialogComponent,
  SignUpDialogComponent
} from '@shared/dialogs/components';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent {
  user$: Observable<User | null> = this.authService.user$;
  hasAdminPermission$: Observable<boolean> = this.authService.hasAdminPermission$;
  isGuest$: Observable<boolean> = this.authService.user$
    .pipe(
      map((user: User | null) => !user),
    );
  UserRole = UserRole;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

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
    this.authService.user$.next(null);
  }

  openMenuCreateDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(MenuEditDialogComponent)
  }

  openReceiptCreateDialog(): void {
    this.dialog.closeAll();
    this.dialog.open(ReceiptEditDialogComponent)
  }
}
