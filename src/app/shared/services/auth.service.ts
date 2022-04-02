import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/interfaces/User';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  constructor(private apiService: ApiService) {}

  registerUser(user: User) {
    return this.apiService.registerUser(user).subscribe(console.warn);
  }
}
