import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, combineLatest, map, Observable, of, switchMap } from 'rxjs';

import { Ingredient } from '@shared/ingredient/models';

import { Recipe, RecipeComplexity } from '../models';

export interface SaveRecipePayload {
  name: string;
  description: string;
  secondsDuration: number;
  productsCost: number;
  complexity: RecipeComplexity;
  ingredientIndices: number[];
}

export interface UpdateRecipePayload {
  id: number;
  name: string;
  description: string;
  secondsDuration: number;
  productsCost: number;
  complexity: RecipeComplexity;
  ingredientIndices: number[];
}

@Injectable()
export class RecipeService {
  private basic = 'http://localhost:8080/recipes';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.basic)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error(error.message);
          return of([]);
        }),
      );
  }

  getById(id: number): Observable<Recipe> {
    return combineLatest([
      this.http.get<Recipe>(this.basic + `/${id}`),
      this.http.get<Ingredient[]>(this.basic + `/${id}/ingredients`),
    ])
      .pipe(
        map(([recipe, ingredients]) => ({ ...recipe, ingredients }))
      )
  }

  savePhoto(id: number, file: File): Observable<unknown> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.basic + `/${id}/image`, formData, { responseType: 'text' })
  }

  save(value: SaveRecipePayload): Observable<Recipe> {
    return this.http.post<Recipe>(this.basic, value);
  }

  update(value: UpdateRecipePayload): Observable<Recipe> {
    return this.http.patch<Recipe>(this.basic + `/${value.id}`, value)
      .pipe(
        switchMap(() => this.http.put<Recipe>(this.basic + `/${value.id}/ingredients`, {ingredientIndices: value.ingredientIndices}))
      );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.basic + `/${id}`);
  }
}
