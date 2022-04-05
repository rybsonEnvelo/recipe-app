import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { Role } from '../enums/Role.enum';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const canActivateRoles = route.data['roles'] as Role[];

    return this.userService.user$.pipe(
      map((user) => canActivateRoles.includes(user?.role!!)),
      tap((canActivate) => {
        if (canActivate) {
          return;
        }

        this.router.navigate(['main']);
      })
    );
  }
}
