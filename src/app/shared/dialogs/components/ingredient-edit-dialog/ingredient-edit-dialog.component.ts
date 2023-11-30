import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, filter, finalize, Observable, of, switchMap, take, tap, } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { RecipeService, SaveRecipePayload, UpdateRecipePayload } from '@shared/recipe/services';
import { IngredientService, SaveIngredientPayload, UpdateIngredientPayload } from '@shared/ingredient/services';
import { Ingredient } from '@shared/ingredient/models';
import { UserService } from '@shared/auth/services';
import { Recipe } from '@shared/recipe/models';

@UntilDestroy()
@Component({
  selector: 'app-ingredient-edit-dialog',
  templateUrl: './ingredient-edit-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RecipeService, IngredientService],
})
export class IngredientEditDialogComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ingredient$: Observable<Ingredient | null> = this.data?.id ? this.ingredientService.getById(this.data.id) : of(null)
  hasAdminPermission$: Observable<boolean> = this.userService.hasAdminPermission$

  isReadOnly!: boolean;
  ingredientForm: FormGroup = this.formBuilder.group({
    id: this.data?.id,
    name: [{value: '', disabled: this.isReadOnly}, Validators.required],
  });

  private selectedPhoto!: File;
  private photoChanged!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private dialogRef: MatDialogRef<IngredientEditDialogComponent>,
    private ingredientService: IngredientService,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadIngredient();
  }

  submitDialog(): void {
    this.loading$.next(true)
    let saveAction: Observable<Ingredient> = this.ingredientService.save(this.getSavePayload(this.ingredientForm));

    if (this.data?.id) {
      saveAction = this.ingredientService.update(this.getUpdatePayload(this.ingredientForm));
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
      .subscribe()
  }

  onFileSelected(event: Event) {
    this.selectedPhoto = (event.target as HTMLInputElement).files![0];
    this.ingredientForm.markAsDirty();
    this.photoChanged = true;
  }

  deleteIngredient() {
    this.loading$.next(true);

    this.ingredientService.delete(this.data?.id)
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

  private loadIngredient() {
    this.loading$.next(true);

    this.ingredient$
      .pipe(
        take(1),
        tap((ingredient: Ingredient | null) => {
          this.ingredientForm.controls['name'].setValue(ingredient!.name);
        }),
        finalize(() => this.loading$.next(false)),
        untilDestroyed(this),
      )
      .subscribe()
  }

  private getSavePayload(recipeForm: FormGroup): SaveIngredientPayload {
    const value = recipeForm.value;

    return { name: value.name }
  }

  private getUpdatePayload(recipeForm: FormGroup): UpdateIngredientPayload {
    const value = recipeForm.value;

    return {id: this.data.id, name: value.name }
  }

  private sendRequestWithPhoto(saveAction$: Observable<Ingredient>): Observable<unknown> {
    return this.photoChanged
      ? saveAction$.pipe(
        switchMap((ingredient: Ingredient) =>
          this.ingredientService.savePhoto(ingredient?.id ?? this.data.id, this.selectedPhoto)
        )
      )
      : saveAction$;
  }
}
