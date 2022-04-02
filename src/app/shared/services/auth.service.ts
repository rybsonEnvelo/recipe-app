import { Injectable } from '@angular/core';
import { delay, Subject, tap } from 'rxjs';
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
  public registerUserState$ = new Subject<AuthResponse>();

  constructor(private apiService: ApiService) {}

  registerUser(user: User) {
    return this.apiService.registerUser(user).subscribe({
      error: (error) => this.registerUserState$.next({ state: State.ERROR, errorCode: error.status }),
      complete: () => this.registerUserState$.next({ state: State.SUCCESS }),
    });
  }
}
