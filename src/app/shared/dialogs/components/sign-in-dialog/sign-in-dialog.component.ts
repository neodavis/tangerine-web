import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject, finalize, tap } from 'rxjs';

import { UserService } from '@shared/auth/services';
import { UserCredentials } from '@shared/auth/models';

@UntilDestroy()
@Component({
  selector: 'app-sign-in-dialog',
  templateUrl: './sign-in-dialog.component.html',
  styleUrls: ['./sign-in-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInDialogComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(4)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  })

  constructor(
    private dialogRef: MatDialogRef<SignInDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
  ) { }

  submitDialog(): void {
    this.loading$.next(true);
    this.userService.signIn(this.form.value)
      .pipe(
        tap((res: UserCredentials) => {
          localStorage.setItem('jwtToken', res.token);
          this.router.navigate(['recipe-list']);
          this.closeDialog();
        }),
        finalize(() => this.loading$.next(false)),
        untilDestroyed(this),
      )
      .subscribe();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
