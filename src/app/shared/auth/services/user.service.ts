import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import jwt_decode from 'jwt-decode';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';

import { UserData, UserCredentials, UserRole, User } from '../models';
import { Recipe, RecipeComplexity } from '@shared/recipe/models';
import { Ingredient } from '@shared/ingredient/models';
import { Menu } from '@shared/menu/models';
import { Router } from '@angular/router';

export interface SaveUserPayload extends Omit<User, 'id'> { }

export interface UpdateUserPayload extends Partial<User> { }

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user$: BehaviorSubject<UserData | null> = new BehaviorSubject<UserData | null>(null);
  hasAdminPermission$: Observable<boolean> = this.user$
    .pipe(
      map((user: UserData | null) => !!user?.roles.includes(UserRole.Admin)),
    )

  private basic = 'http://localhost:8080';

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
  }

  isTokenValid(token: string): boolean {
    try {
      const decodedToken: { id: number, sub: string, roles: UserRole[], exp: number } = jwt_decode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        return false;
      }

      this.user$.next({id: decodedToken.id, username: decodedToken.sub, roles: decodedToken.roles});
      return true;
    } catch (error) {
      return false;
    }
  }

  signIn({ username, password }: Pick<User, 'username' | 'password'>): Observable<UserCredentials> {
    return this.http.post<UserCredentials>(this.basic + '/auth/sign-in', {username, password});
  }

  signUp({ username, email, phoneNumber, password, }: User): Observable<UserCredentials> {
    return this.http.post<UserData>(this.basic + '/auth/sign-up', {username, email, phoneNumber, password})
      .pipe(
        switchMap(() => this.signIn({ username, password })),
        tap((res) => {
          localStorage.setItem('jwtToken', res.token);
          this.router.navigate(['recipe-list']);
        })
      );
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(this.basic + `/users/${id}`);
  }

  getUserRecipes(id: number): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.basic + `/users/${id}/recipes`);
  }

  getUserMenus(id: number): Observable<Menu[]> {
    return this.http.get<Menu[]>(this.basic + `/users/${id}/menus`);
  }

  savePhoto(id: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.basic + `/users/${id}/image`, formData, { responseType: 'text' });
  }

  save(value: SaveUserPayload): Observable<User> {
    return this.http.post<User>(this.basic + `/users`, value);
  }

  update(value: UpdateUserPayload): Observable<User> {
    return this.http.patch<User>(this.basic + `/users/${value.id}`, value);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.basic + `/users/${id}`);
  }
}
