import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import jwt_decode from 'jwt-decode';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

import { User, UserCredentials, UserRole } from '../models';
import { Receipt } from '@shared/receipt/models';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>({
    id: 1,
    roles: [UserRole.Admin],
    username: '123123'
  });
  hasAdminPermission$: Observable<boolean> = this.user$
    .pipe(
      map((user: User | null) => !!user?.roles.includes(UserRole.Admin)),
    )

  private basic = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {
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

  signIn({ username, password }: { username: string, password: string }): Observable<UserCredentials> {
    return this.http.post<UserCredentials>(this.basic + '/sign-in', {username, password});
  }

  signUp({ username, password }: { username: string, password: string }): Observable<UserCredentials> {
    return this.http.post<UserCredentials>(this.basic + '/sign-up', {username, password});
  }

  savePhoto(file: File): Observable<unknown> {
    const formData = new FormData();
    formData.append('file', file);

    return of(null as unknown as Receipt);

    // return this.http.post(, formData)
  }
}
