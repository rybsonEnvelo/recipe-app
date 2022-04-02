import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, Subject, take, tap } from 'rxjs';
import { User } from 'src/app/shared/interfaces/User';
import { State } from '../enums/State';
import { AuthResponse } from '../interfaces/AuthResponse';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public registerUserState = new Subject<AuthResponse>();
  public loginUserState = new Subject<AuthResponse>();
  private authorized!: BehaviorSubject<boolean>;
  private user = new BehaviorSubject<User | null>(null);

  get authorized$() {
    return this.authorized.asObservable();
  }

  get user$() {
    return this.user.asObservable();
  }

  constructor(private apiService: ApiService, private router: Router) {
    this.authorized = new BehaviorSubject(!!localStorage.getItem('user'));
  }

  registerUser(user: User) {
    return this.apiService.registerUser(user).subscribe({
      error: (error) => this.registerUserState.next({ state: State.ERROR, errorCode: error.status }),
      next: () => this.registerUserState.next({ state: State.SUCCESS }),
    });
  }

  loginUser(user: User) {
    return this.apiService
      .loginUser(user)
      .pipe(take(1))
      .subscribe({
        error: (error) => this.loginUserState.next({ state: State.ERROR, errorCode: error.status }),
        next: (response) => {
          this.loginUserState.next({ state: State.SUCCESS });
          localStorage.setItem('user', JSON.stringify(response));
          this.authorized.next(true);
          this.router.navigate(['main']);
          this.user.next(response);
        },
      });
  }

  logOutUser() {
    localStorage.removeItem('user');
    this.router.navigate(['auth']);
    this.authorized.next(false);
    this.user.next(null);
  }
}
