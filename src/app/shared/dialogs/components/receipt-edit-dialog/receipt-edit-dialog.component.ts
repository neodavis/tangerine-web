import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  BehaviorSubject,
  finalize,
  map,
  Observable,
  of,
  startWith,
  switchMap,
  take,
  tap,
  withLatestFrom,
} from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Receipt } from '@shared/receipt/models';
import { MenuService } from '@shared/menu/services';
import { ReceiptService } from '@shared/receipt/services';
import { Ingredient } from '@shared/ingredient/models';
import { IngredientService } from '@shared/ingredient/services';

@UntilDestroy()
@Component({
  selector: 'app-receipt-edit-dialog',
  templateUrl: './receipt-edit-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuService, ReceiptService, IngredientService],
})
export class ReceiptEditDialogComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  receipt$: Observable<Receipt | null> = this.data?.id ? this.receiptService.getById(this.data.id) : of(null);
  ingredients$: Observable<Ingredient[]> = this.ingredientServiceService.getAll();
  ingredientOptions$: Observable<Ingredient[]> = this.ingredients$;

  receiptForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    ingredient: '',
    ingredients: this.formBuilder.array([] as Receipt[]),
  })

  private selectedPhoto!: File;
  private photoChanged!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: string },
    private dialogRef: MatDialogRef<ReceiptEditDialogComponent>,
    private formBuilder: FormBuilder,
    private ingredientServiceService: IngredientService,
    private receiptService: ReceiptService,
  ) { }

  ngOnInit(): void {
    this.loadReceipt();
    this.loadIngredientOptions();
  }

  submitDialog(): void {
    const saveAction: Observable<Receipt> = this.data?.id ? this.receiptService.save(this.receiptForm.value) : this.receiptService.update(this.receiptForm.value);

    this.loading$.next(true)

    if (this.photoChanged) {
      this.receiptService.savePhoto(this.selectedPhoto)
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

  get ingredientsControl() {
    return this.receiptForm.controls['ingredients'] as FormArray<FormControl<Ingredient>>;
  }

  private loadReceipt(): void {
    this.loading$.next(true);
    this.receipt$
      .pipe(
        take(1),
        tap((receipt: Receipt | null) => {
          this.setName(receipt?.name ?? '');
          this.setIngredients(receipt?.ingredients ?? []);
          this.observeAddIngredientControlChange();
        }),
        finalize(() => this.loading$.next(false)),
        untilDestroyed(this),
      )
      .subscribe()
  }

  private setName(name: string): void {
    this.receiptForm.controls['name'].setValue(name);
  }

  private setIngredients(ingredients: Ingredient[]): void {
    const ingredientFormGroups: FormGroup[] = ingredients.map(ingredient => this.formBuilder.group(ingredient));
    const ingredientFormArray: FormArray = this.formBuilder.array(ingredientFormGroups);

    this.receiptForm.setControl('ingredient', ingredientFormArray);
  }

  private observeAddIngredientControlChange() {
    this.receiptForm.controls['ingredient'].valueChanges
      .pipe(
        switchMap((id: string) => this.ingredients$
          .pipe(
            map((ingredients: Ingredient[]) => ingredients.find(ingredient => ingredient.id === id)!),
            tap((ingredient: Ingredient) => {
              this.addReceipt(ingredient);
            })
          ))
      )
      .subscribe()
  }

  private addReceipt(ingredient: Ingredient) {
    const ingredientControl: FormControl = this.formBuilder.control(ingredient);
    this.ingredientsControl.push(ingredientControl);

    this.receiptForm.controls['ingredient'].reset('', {emitEvent: false});
  }

  private loadIngredientOptions() {
    this.ingredientOptions$ = this.ingredientsControl.valueChanges
      .pipe(
        startWith(this.ingredientsControl.value),
        withLatestFrom(this.ingredients$),
        map(([selectedReceipts, receipts]) => {

          return receipts.filter(item => !selectedReceipts.some(receipt => receipt.id === item.id));
        })
      )
  }

  onFileSelected(event: Event) {
    this.selectedPhoto = (event.target as HTMLInputElement).files![0];
    this.photoChanged = true;
  }
}
