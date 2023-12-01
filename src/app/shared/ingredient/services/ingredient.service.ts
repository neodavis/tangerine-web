import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Ingredient } from '../models';

export interface SaveIngredientPayload {
  name: string;
}

export interface UpdateIngredientPayload {
  id: number;
  name: string;
}

@Injectable()
export class IngredientService {
  private basic = 'http://localhost:8080/ingredients';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.basic)
  }

  getById(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(this.basic + `/${id}`);
  }

  save(value: SaveIngredientPayload): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.basic, value);
  }

  update(value: UpdateIngredientPayload): Observable<Ingredient> {
    return this.http.patch<Ingredient>(this.basic + `/${value.id}`, value);
  }

  savePhoto(id: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.basic + `/${id}/image`, formData, { responseType: 'text' });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.basic + `/${id}`);
  }
}
