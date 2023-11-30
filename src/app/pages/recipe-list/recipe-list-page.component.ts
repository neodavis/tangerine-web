import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { BehaviorSubject, finalize, Observable } from 'rxjs';

import { RecipeService } from '@shared/recipe/services';
import { Recipe } from '@shared/recipe/models';
import { MatDialog } from '@angular/material/dialog';
import { RecipeEditDialogComponent } from '@shared/dialogs/components';
import { ActivatedRoute } from '@angular/router';
import { CdkCopyToClipboard, Clipboard } from '@angular/cdk/clipboard';
import { NotificationService } from '@shared/notification/services';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RecipeService],
})
export class RecipeListPageComponent implements OnInit {
  collection$: Observable<Recipe[]> = this.recipeService.getAll()
    .pipe(
      finalize(() => this.loading$.next(false))
    );
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  selectedRecipeId$: BehaviorSubject<number> = new BehaviorSubject<number>(+(this.activatedRoute.snapshot.queryParamMap.get('recipeId') ?? 0));

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private notificationService: NotificationService,
    private clipboard: Clipboard,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.loading$.next(true);

    this.selectedRecipeId$.subscribe(console.log)
  }

  openRecipeEditDialog(id: number): void {
    this.dialog.closeAll();
    this.dialog.open(RecipeEditDialogComponent, {data: {id}})
  }

  handleImageError(event: ErrorEvent) {
    (event.target as HTMLImageElement).src = 'assets/empty-image.jpg';
    (event.target as HTMLImageElement).alt = 'No Image Available';
  }

  shareRecipe(recipe: Recipe) {
    const randomNumber = Math.floor(Math.random() * 6);
    const shareMessages = [
      `Hey there! Feast your eyes on this fabulous recipe of ${recipe.name}, that I recently stumbled upon. Click the link below to explore all the details: [See more...](http://localhost:4200/recipe-list?recipeId=${recipe.id})`,
      `Greetings! I'm excited to share this amazing recipe of ${recipe.name}, that I came across. Dive into the details by following the link below: [See more...](http://localhost:4200/recipe-list?recipeId=${recipe.id})`,
      `Hello! I just uncovered this incredible recipe of ${recipe.name}, and I couldn't wait to share it with you. Delve into the specifics using the link provided: [See more...](http://localhost:4200/recipe-list?recipeId=${recipe.id})`,
      `Hi! I've got a fantastic recipe of ${recipe.name}, that I want to introduce to you. Discover all the details by clicking on the link below: [See more...](http://localhost:4200/recipe-list?recipeId=${recipe.id})`,
      `Hey! Look at this stunning recipe of ${recipe.name} that I just uncovered. To find out more, simply follow the link below: [See more...](http://localhost:4200/recipe-list?recipeId=${recipe.id})`,
      `Good day! I stumbled upon this mouthwatering recipe of ${recipe.name} and couldn't resist sharing it with you. Follow the link to unravel the culinary magic: [See more...](http://localhost:4200/recipe-list?recipeId=${recipe.id})`,
      `Greetings, food enthusiast! Prepare yourself for a culinary delight with this incredible recipe of ${recipe.name}. Click the link below to unveil the secrets: [See more...](http://localhost:4200/recipe-list?recipeId=${recipe.id})`,
      `Hi there! I've discovered a hidden gem of a recipe—${recipe.name}. Don't miss out on the delicious details. Follow this link: [See more...](http://localhost:4200/recipe-list?recipeId=${recipe.id})`,
      `Hello, fellow foodie! I've got a treat for you—an amazing recipe of ${recipe.name}. Follow the link to indulge your taste buds: [See more...](http://localhost:4200/recipe-list?recipeId=${recipe.id})`,
      `Salutations! Brace yourself for a culinary adventure with this exquisite recipe of ${recipe.name}. Click the link below to savor every detail: [See more...](http://localhost:4200/recipe-list?recipeId=${recipe.id})`
    ];

    this.clipboard.copy(shareMessages[randomNumber]);
    this.notificationService.showSuccessNotification('Recipe have been processed into clipboard. Feel free to share it!')
  }
}