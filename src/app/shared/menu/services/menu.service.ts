import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchError, forkJoin, map, Observable, of, switchMap } from 'rxjs';

import { Menu } from '../models';
import { Recipe } from '@shared/recipe/models';

export interface SaveMenuPayload {
  name: string;
  recipeIndices: number[];
}

export interface UpdateMenuPayload {
  id: number;
  name: string;
  recipeIndices: number[];
}


@Injectable()
export class MenuService {
  private basic = 'http://localhost:8080/menus';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.basic)
      .pipe(
        catchError((error: HttpErrorResponse) => {
            console.error(error.message);
            return of([]);
          },
        )
      );
  }

  getAllWithRecipes(): Observable<Menu[]> {
    return this.getAll()
      .pipe(
        switchMap((menus: Menu[]) => {
          const menuObservables: Observable<Menu>[] = menus.map((menu) =>
            this.getRecipesByMenuId(menu.id).pipe(
              map((recipes: Recipe[]) => ({
                ...menu,
                recipes,
              }))
            )
          );
          return forkJoin(menuObservables);
        })
      );
  }

  getById(id: number): Observable<Menu> {
    return this.http.get<Menu>(this.basic + `/${id}`);
  }

  getByIdWithRecipes(id: number): Observable<Menu> {
    return forkJoin([
      this.getById(id),
      this.getRecipesByMenuId(id)
    ])
      .pipe(
        map(([menu, recipes]) => ({ ...menu, recipes }))
      )
  }

  getRecipesByMenuId(id: number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.basic + `/${id}/recipes`)
  }

  savePhoto(id: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.basic + `/${id}/image`, formData, { responseType: 'text' })
  }

  save(value: SaveMenuPayload): Observable<Menu> {
    return this.http.post<Menu>(this.basic, value);
  }

  update({ id, name, recipeIndices }: UpdateMenuPayload): Observable<Menu> {
    return this.http.patch<Menu>(this.basic + `/${id}`, { name })
      .pipe(
        switchMap(() => this.http.put<Menu>(this.basic + `/${id}/recipes`, { recipeIndices }))
      );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.basic + `/${id}`);
  }
}
