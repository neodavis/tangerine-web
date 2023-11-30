import { Ingredient } from '@shared/ingredient/models';

export interface Recipe {
  authorUsername: string;
  id: number;
  name: string;
  quantity: number;
  duration: number;
  description: string;
  complexity: RecipeComplexity;
  price: number;
  ingredients: Ingredient[];
  ingredientIndices: number[];
  productsCost: number;
  secondsDuration: number;
  photo: unknown;
  createdAt: number;
  createdBy: string;
}

export enum RecipeComplexity {
  EASY = 'EASY',
  MEDIUM = 'MEDIUM',
  HARD = 'HARD',
}
