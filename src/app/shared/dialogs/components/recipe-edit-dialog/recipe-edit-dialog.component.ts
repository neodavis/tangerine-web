import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, finalize, map, merge, Observable, of, startWith, switchMap, take, tap, } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Recipe, RecipeComplexity } from '@shared/recipe/models';
import { MenuService } from '@shared/menu/services';
import { RecipeService, SaveRecipePayload, UpdateRecipePayload } from '@shared/recipe/services';
import { Ingredient } from '@shared/ingredient/models';
import { IngredientService } from '@shared/ingredient/services';

@UntilDestroy()
@Component({
  selector: 'app-recipe-edit-dialog',
  templateUrl: './recipe-edit-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuService, RecipeService, IngredientService],
})
export class RecipeEditDialogComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  recipe$: Observable<Recipe | null> = this.data?.id ? this.recipeService.getById(this.data.id) : of(null);

  ingredients$: Observable<Ingredient[]> = this.ingredientService.getAll();
  ingredientOptions$: BehaviorSubject<Ingredient[]> = new BehaviorSubject<Ingredient[]>([]);

  ingredientControl: FormControl<string | null> = new FormControl<string | null>(null);

  recipeForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    complexity: [RecipeComplexity.MEDIUM, Validators.required],
    duration: ['25', Validators.required],
    productsCost: [0, Validators.required],
    ingredients: this.formBuilder.array([] as Recipe[]),
  })

  readonly RecipeComplexity = RecipeComplexity;

  private selectedPhoto!: File;
  private photoChanged!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private dialogRef: MatDialogRef<RecipeEditDialogComponent>,
    private formBuilder: FormBuilder,
    private ingredientService: IngredientService,
    private recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.loadRecipe();
  }

  submitDialog(): void {
    this.loading$.next(true)
    let saveAction: Observable<Recipe> = this.recipeService.save(this.getSavePayload(this.recipeForm));

    if (this.data?.id) {
      saveAction = this.recipeService.update(this.getUpdatePayload(this.recipeForm))
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

  get ingredientsControl() {
    return this.recipeForm.controls['ingredients'] as FormArray<FormControl<Ingredient>>;
  }

  private loadRecipe(): void {
    this.loading$.next(true);
    this.recipe$
      .pipe(
        take(1),
        tap((recipe: Recipe | null) => this.initializeRecipeFormData(recipe!)),
        finalize(() => this.loading$.next(false)),
        untilDestroyed(this),
      )
      .subscribe()
  }

  onFileSelected(event: Event) {
    this.selectedPhoto = (event.target as HTMLInputElement).files![0];
    this.recipeForm.markAsDirty();
    this.photoChanged = true;
  }

  deleteRecipe() {
    this.loading$.next(true);

    this.recipeService.delete(this.data?.id)
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

  private initializeRecipeFormData(recipe: Recipe): void {
    this.recipeForm.controls['name'].setValue(recipe?.name ?? '');
    this.recipeForm.controls['description'].setValue(recipe?.description ?? '');
    this.recipeForm.controls['complexity'].setValue(recipe?.complexity ?? RecipeComplexity.MEDIUM);
    this.recipeForm.controls['duration'].setValue((recipe?.secondsDuration ?? 0) / 60);
    this.recipeForm.controls['productsCost'].setValue(recipe?.productsCost ?? '');
    this.recipeForm.controls['name'].setValue(recipe?.name ?? '');

    this.setIngredients(recipe?.ingredients ?? []);

    this.observeIngredientControlChange();
  }

  private setIngredients(ingredients: Ingredient[]): void {
    const ingredientFormGroups: FormGroup[] = ingredients.map(ingredient => this.formBuilder.group(ingredient));
    const ingredientFormArray: FormArray = this.formBuilder.array(ingredientFormGroups);

    this.recipeForm.setControl('ingredients', ingredientFormArray);
    this.ingredientOptions$.next(this.ingredientOptions$.value
      .filter(ingredient => ingredients.every(selectedIngredient => selectedIngredient.id !== ingredient.id)))
  }

  private addIngredient(ingredient: Ingredient) {
    const ingredientControl: FormControl = this.formBuilder.control(ingredient);
    this.ingredientsControl.push(ingredientControl);

    this.ingredientControl.reset(null, {emitEvent: false});
    this.recipeForm.markAsDirty();
  }

  private getSavePayload(recipeForm: FormGroup): SaveRecipePayload {
    const value = recipeForm.value;

    return {
      complexity: value.complexity,
      description: value.description,
      ingredientIndices: value.ingredients.map((ingredient: Ingredient) => ingredient.id),
      name: value.name,
      productsCost: value.productsCost,
      secondsDuration: value.duration * 60,
    }
  }

  private getUpdatePayload(recipeForm: FormGroup): UpdateRecipePayload {
    const value = recipeForm.value;

    return {
      id: this.data.id,
      complexity: value.complexity,
      description: value.description,
      ingredientIndices: value.ingredients.map((ingredient: Ingredient) => ingredient.id),
      name: value.name,
      productsCost: value.productsCost,
      secondsDuration: value.duration * 60,
    }
  }

  private observeIngredientControlChange() {
    merge(
      this.ingredientControl.valueChanges,
      this.ingredientsControl.valueChanges,
    )
      .pipe(
        startWith(''),
        switchMap(() => this.ingredients$
          .pipe(
            tap((ingredients: Ingredient[]) => {
              const ingredient: Ingredient | undefined = ingredients
                .find((ingredient: Ingredient) => ingredient.id === +this.ingredientControl.value!);

              if (ingredient) {
                this.addIngredient(ingredient);
              }
            }),
            map((ingredients: Ingredient[]) => ingredients
              .filter((ingredient: Ingredient) => this.ingredientsControl.value
              .every(selectedIngredient => selectedIngredient.id !== ingredient.id!))
            ),
            tap((ingredients: Ingredient[]) => this.ingredientOptions$.next(ingredients)),
          )
        )
      )
      .subscribe()
  }

  private sendRequestWithPhoto(saveAction$: Observable<Recipe>): Observable<unknown> {
    return this.photoChanged
      ? saveAction$.pipe(
        switchMap((recipe: Recipe) =>
          this.recipeService.savePhoto(recipe?.id ?? this.data.id, this.selectedPhoto)
        )
      )
      : saveAction$;
  }
}
