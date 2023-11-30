import { Recipe } from '@shared/recipe/models';

export interface Menu {
  id: number;
  name: string;
  recipes: Recipe[];
  recipesIndices?: number[];
  recipeIndices?: number[];
  createdAt: number;
  authorUsername: string;
}
