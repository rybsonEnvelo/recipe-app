import { Injectable } from '@angular/core';
import { delay, Subject, tap } from 'rxjs';
import { User } from 'src/app/shared/interfaces/User';
import { AuthState } from '../enums/AuthState';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  public authState = new Subject<string>();

  constructor(private apiService: ApiService) {}

  registerUser(user: User) {
    return this.apiService.registerUser(user).subscribe({
      error: () => this.authState.next(AuthState.REGISTER_ERROR),
      complete: () => this.authState.next(AuthState.REGISTER_SUCCESS),
    });
  }
}
