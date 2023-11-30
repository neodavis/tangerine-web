import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, finalize, Observable, switchMap, take, tap, } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { SaveUserPayload, UpdateUserPayload, UserService } from '@shared/auth/services';
import { User } from '@shared/auth/models';

@UntilDestroy()
@Component({
  selector: 'app-recipe-edit-dialog',
  templateUrl: './user-edit-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditDialogComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  user$: Observable<User | null> = this.userService.getById(this.data.id);

  userForm: FormGroup = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: '',
    password: '',
    phoneNumber: '',
  })

  private selectedPhoto!: File;
  private photoChanged!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private dialogRef: MatDialogRef<UserEditDialogComponent>,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  submitDialog(): void {
    this.loading$.next(true)
    let saveAction: Observable<User> = this.userService.save(this.getSavePayload(this.userForm));

    if (this.data?.id) {
      saveAction = this.userService.update(this.getUpdatePayload(this.userForm))
    }

    this.sendRequestWithPhoto(saveAction)
      .pipe(
        take(1),
        tap(() => {
          location.reload();
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

  private loadUser(): void {
    this.loading$.next(true);
    this.user$
      .pipe(
        take(1),
        tap((user: User | null) => this.initializeUserFormData(user!)),
        finalize(() => this.loading$.next(false)),
        untilDestroyed(this),
      )
      .subscribe()
  }

  onFileSelected(event: Event) {
    this.selectedPhoto = (event.target as HTMLInputElement).files![0];
    this.userForm.markAsDirty();
    this.photoChanged = true;
  }

  deleteUser() {
    this.loading$.next(true);

    this.userService.delete(this.data.id)
      .pipe(
        take(1),
        tap(() => {
          localStorage.removeItem('jwtToken');
          this.userService.user$.next(null);
          location.reload();
          this.closeDialog();
        }),
        finalize(() => this.loading$.next(false)),
        untilDestroyed(this),
      )
      .subscribe();
  }

  private initializeUserFormData(user: User): void {
    this.userForm.controls['username'].setValue(user.username);
    this.userForm.controls['email'].setValue(user.email ?? '');
    this.userForm.controls['phoneNumber'].setValue(user.phoneNumber ?? '');
  }


  private getSavePayload(userForm: FormGroup): SaveUserPayload {
    const value = userForm.value;

    return {
      email: value.email,
      password: value.password,
      phoneNumber: value.phoneNumber,
      username: value.username
    }
  }

  private getUpdatePayload(userForm: FormGroup): UpdateUserPayload {
    const value = userForm.value;

    return value.password ?
      {
        id: this.data.id,
        email: value.email,
        password: value.password,
        phoneNumber: value.phoneNumber,
        username: value.username
      }
      :
      {
        id: this.data.id,
        email: value.email,
        phoneNumber: value.phoneNumber,
        username: value.username
      }
  }

  private sendRequestWithPhoto(saveAction$: Observable<User>): Observable<unknown> {
    return this.photoChanged
      ? saveAction$.pipe(
        switchMap((user: User) =>
          this.userService.savePhoto(user?.id ?? this.data.id, this.selectedPhoto)
        )
      )
      : saveAction$;
  }
}
