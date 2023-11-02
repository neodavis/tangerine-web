import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, finalize, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { AuthService } from '@shared/auth/services';

@UntilDestroy()
@Component({
  selector: 'app-sign-up-dialog',
  templateUrl: './sign-up-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpDialogComponent {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  form: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
    password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(24)]],
  })
  private selectedPhoto!: File;

  constructor(
    private dialogRef: MatDialogRef<SignUpDialogComponent>,
    private formBuilder: FormBuilder,
    private authService: AuthService,
  ) { }

  submitDialog(): void {
    this.loading$.next(true);

    this.authService.savePhoto(this.selectedPhoto)
      .pipe(untilDestroyed(this))
      .subscribe();

    this.authService.signUp(this.form.value)
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

  onFileSelected(event: Event) {

  }
}
