import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {
  }

  canActivate(): boolean {
    const token = localStorage.getItem('jwtToken');

    if (token) {
      const isTokenValid = this.userService.isTokenValid(token);

      if (isTokenValid) {
        return true;
      }
    }

    this.router.navigate(['/home']);
    return false;
  }
}
