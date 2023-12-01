import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, finalize, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { UserService } from '@shared/auth/services';

@UntilDestroy()
@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpDialogComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  form: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(3)]],
  })

  constructor(
    private dialogRef: MatDialogRef<SignUpDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  submitDialog(): void {
    this.loading$.next(true);

    this.userService.signUp(this.form.value)
      .pipe(
        tap(() => this.closeDialog()),
        finalize(() => this.loading$.next(false)),
        untilDestroyed(this),
      )
      .subscribe();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
