import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, filter, finalize, Observable, of, take, tap, } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ReceiptService } from '@shared/receipt/services';
import { IngredientService } from '@shared/ingredient/services';
import { Ingredient } from '@shared/ingredient/models';

@UntilDestroy()
@Component({
  selector: 'app-ingredient-edit-dialog',
  templateUrl: './ingredient-edit-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReceiptService, IngredientService],
})
export class IngredientEditDialogComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  ingredient$: Observable<Ingredient | null> = this.data?.id ? this.ingredientService.getById(this.data.id) : of(null)

  isReadOnly!: boolean;
  ingredientForm: FormGroup = this.formBuilder.group({
    name: [{value: '', disabled: this.isReadOnly}, Validators.required],
    quantity: [{value: '', disabled: this.isReadOnly}, Validators.required],
    duration: [{value: '', disabled: this.isReadOnly}, Validators.required],
    difficulty: [{value: '', disabled: this.isReadOnly}, Validators.required],
    price: [{value: '', disabled: this.isReadOnly}, Validators.required],
  });

  private selectedPhoto!: File;
  private photoChanged!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: string },
    private dialogRef: MatDialogRef<IngredientEditDialogComponent>,
    private ingredientService: IngredientService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadIngredient();
  }

  submitDialog(): void {
    const saveAction = this.data?.id ? this.ingredientService.save(this.ingredientForm.value) : this.ingredientService.update(this.ingredientForm.value);

    this.loading$.next(true)

    if (this.photoChanged) {
      this.ingredientService.savePhoto(this.selectedPhoto)
        .pipe(untilDestroyed(this))
        .subscribe();
    }

    saveAction
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

  private loadIngredient(): void {
    this.loading$.next(true);
    this.ingredient$
      .pipe(
        take(1),
        filter(Boolean),
        tap((ingredient: Ingredient) => this.setFormData(ingredient)),
        finalize(() => this.loading$.next(false)),
        untilDestroyed(this),
      )
      .subscribe()
  }

  private setFormData(ingredient: Ingredient): void {
    this.ingredientForm.patchValue(ingredient);
  }

  onFileSelected(event: Event) {
    this.selectedPhoto = (event.target as HTMLInputElement).files![0];
    this.photoChanged = true;
  }
}
