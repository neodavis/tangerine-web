import { Ingredient } from '@shared/ingredient/models';

export interface Receipt {
  id: string;
  name: string;
  quantity: number;
  duration: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  price: number;
  ingredients: Ingredient[];
  photo: unknown;
  createdAt: number;
  createdBy: string;
}
