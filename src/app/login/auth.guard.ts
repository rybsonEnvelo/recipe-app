import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { take, tap } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate() {
    return this.authService.authorized$.pipe(
      take(1),
      tap((isLogged) => {
        if (isLogged) return;

        this.router.navigate(['auth']);
      })
    );
  }
}
