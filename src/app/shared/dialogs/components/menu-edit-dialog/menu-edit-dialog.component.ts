import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import {
  BehaviorSubject,
  finalize,
  map,
  merge,
  Observable,
  of,
  startWith,
  switchMap,
  take,
  tap,
  withLatestFrom
} from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Menu } from '@shared/menu/models';
import { Recipe } from '@shared/recipe/models';
import { MenuService, SaveMenuPayload, UpdateMenuPayload } from '@shared/menu/services';
import { RecipeService } from '@shared/recipe/services';
import { UserService } from '@shared/auth/services';
import { Ingredient } from '@shared/ingredient/models';

@UntilDestroy()
@Component({
  selector: 'app-menu-edit-dialog',
  templateUrl: './menu-edit-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuService, RecipeService],
})
export class MenuEditDialogComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  menu$: Observable<Menu | null> = this.data?.id ? this.menuService.getByIdWithRecipes(this.data.id) : of(null);
  recipes$: Observable<Recipe[]> = this.recipeService.getAll();
  recipeOptions$: BehaviorSubject<Recipe[]> = new BehaviorSubject<Recipe[]>([]);

  recipeControl: FormControl<string | null> = new FormControl<string | null>(null);

  menuForm: FormGroup = this.formBuilder.group({
    id: this.data?.id,
    name: ['', Validators.required],
    recipes: this.formBuilder.array([] as Recipe[]),
  })

  private selectedPhoto!: File;
  private photoChanged!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: number },
    private dialogRef: MatDialogRef<MenuEditDialogComponent>,
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private recipeService: RecipeService,
  ) { }

  ngOnInit(): void {
    this.loadMenu();
  }

  submitDialog(): void {
    this.loading$.next(true)
    let saveAction: Observable<Menu> = this.menuService.save(this.getSavePayload(this.menuForm));

    if (this.data?.id) {
      saveAction = this.menuService.update(this.getUpdatePayload(this.menuForm));
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

  closeDialog(): void {
    this.dialogRef.close();
  }

  get recipesControl() {
    return this.menuForm.controls['recipes'] as FormArray<FormControl<Recipe>>;
  }

  private loadMenu(): void {
    this.loading$.next(true);
    this.menu$
      .pipe(
        take(1),
        tap((menu: Menu | null) => this.initializeMenuFormData(menu!)),
        finalize(() => this.loading$.next(false)),
        untilDestroyed(this),
      )
      .subscribe()
  }

  private setRecipes(recipes: Recipe[]): void {
    const recipeFormGroups: FormGroup[] = recipes.map(recipe => this.formBuilder.group(recipe));
    const recipeFormArray: FormArray = this.formBuilder.array(recipeFormGroups);

    this.menuForm.setControl('recipes', recipeFormArray);
    this.recipeOptions$.next(this.recipeOptions$.value
      .filter(recipe => recipes.every(selectedRecipe => selectedRecipe.id !== recipe.id)))
  }

  private addRecipe(recipe: Recipe) {
    const recipeControl: FormControl = this.formBuilder.control(recipe);
    this.recipesControl.push(recipeControl);

    this.recipeControl.reset(null, {emitEvent: false});
    this.menuForm.markAsDirty();
  }

  onFileSelected(event: Event) {
    this.selectedPhoto = (event.target as HTMLInputElement).files![0];
    this.menuForm.markAsDirty();
    this.photoChanged = true;
  }

  deleteMenu() {
    this.loading$.next(true);

    this.menuService.delete(this.data?.id)
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

  private getSavePayload(recipeForm: FormGroup): SaveMenuPayload {
    const value = recipeForm.value;

    return {
      name: value.name,
      recipeIndices: value.recipes.map((recipe: Recipe) => recipe.id)
    }
  }

  private getUpdatePayload(recipeForm: FormGroup): UpdateMenuPayload {
    const value = recipeForm.value;

    return {
      id: this.data.id,
      name: value.name,
      recipeIndices: value.recipes.map((recipe: Recipe) => recipe.id)
    }
  }

  private sendRequestWithPhoto(saveAction$: Observable<Menu>): Observable<unknown> {
    return this.photoChanged
      ? saveAction$.pipe(
        switchMap((menu: Menu) =>
          this.menuService.savePhoto(menu?.id ?? this.data.id, this.selectedPhoto)
        )
      )
      : saveAction$;
  }

  private initializeMenuFormData(menu: Menu) {
    this.menuForm.controls['name'].setValue(menu?.name ?? '');
    this.setRecipes(menu?.recipes ?? []);
    this.observeRecipeControlChange();
  }

  private observeRecipeControlChange() {
    merge(
      this.recipeControl.valueChanges,
      this.recipesControl.valueChanges,
    )
      .pipe(
        startWith(''),
        switchMap(() => this.recipes$
          .pipe(
            tap((ingredients: Recipe[]) => {
              const recipe: Recipe | undefined = ingredients
                .find((recipe: Recipe) => recipe.id === +this.recipeControl.value!);

              if (recipe) {
                this.addRecipe(recipe);
              }
            }),
            map((recipes: Recipe[]) => recipes
              .filter((recipe: Recipe) => this.recipesControl.value
              .every(selectedRecipe => selectedRecipe.id !== recipe.id!))
            ),
            tap((recipes: Recipe[]) => this.recipeOptions$.next(recipes)),
          )
        )
      )
      .subscribe()
  }
}
