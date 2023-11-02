import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';

import { Ingredient } from '../models';
import { Receipt } from '@shared/receipt/models';

@Injectable()
export class IngredientService {
    // TODO: Change url after BE ready
    // private basic = 'http://localhost:8080/menu';

    private readonly mock: Ingredient[] = [ ];

    constructor(private http: HttpClient) { }

    getAll(): Observable<Ingredient[]> {
        return of(this.mock)

        // return this.http.get<Menu[]>(this.basic)
        //   .pipe(
        //     catchError((error) => {
        //         console.log(error);
        //         return of([]);
        //       },
        //     )
        //   );
    }

  getById(id: string): Observable<Ingredient> {
    return of(this.mock.find(item => item.id === id)!);

    // return this.http.get<Receipt>(this.basic)
    //   .pipe(
    //     catchError((error) => {
    //         return of(null);
    //       },
    //     )
    //   );
  }

  save(value: Partial<Receipt>) {
    return of(null);
  }

  update(value: Receipt) {
    return of(null);
  }

  savePhoto(file: File): Observable<unknown> {
    const formData = new FormData();
    formData.append('file', file);

    return of(null as unknown as Receipt);

    // return this.http.post(, formData)
  }
}
