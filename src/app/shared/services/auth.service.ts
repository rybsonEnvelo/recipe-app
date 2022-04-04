import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, delay, Subject, take, tap } from 'rxjs';
import { User } from 'src/app/shared/interfaces/User.model';
import { State } from '../enums/State.enum';
import { AuthResponse } from '../interfaces/AuthResponse.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  private registerUserState = new Subject<AuthResponse>();
  private loginUserState = new Subject<AuthResponse>();
  private authorized!: BehaviorSubject<boolean>;
  private user = new BehaviorSubject<User | null>(null);

  get authorized$() {
    return this.authorized.asObservable();
  }

  get user$() {
    return this.user.asObservable();
  }

  get register$() {
    return this.registerUserState.asObservable();
  }

  get login$() {
    return this.loginUserState.asObservable();
  }

  constructor(private apiService: ApiService, private router: Router) {
    this.authorized = new BehaviorSubject(!!localStorage.getItem('user'));
  }

  registerUser(user: User) {
    this.registerUserState.next({ state: State.LOADING });

    return this.apiService.registerUser(user).subscribe({
      error: (error) => this.registerUserState.next({ state: State.ERROR, errorCode: error.status }),
      next: () => this.registerUserState.next({ state: State.SUCCESS }),
    });
  }

  loginUser(user: User) {
    this.loginUserState.next({ state: State.LOADING });

    return this.apiService.loginUser(user).subscribe({
      error: (error) => this.loginUserState.next({ state: State.ERROR, errorCode: error.status }),
      next: (response) => {
        localStorage.setItem('user', JSON.stringify(response.user));
        this.authorized.next(true);
        this.user.next(response.user);
        this.loginUserState.next({ state: State.SUCCESS });
        this.router.navigate(['main']);
      },
    });
  }

  logOutUser() {
    this.authorized.next(false);
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['auth']);
  }
}
