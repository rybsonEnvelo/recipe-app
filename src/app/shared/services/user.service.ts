import { Injectable } from '@angular/core';
import { Role } from '../enums/Role.enum';
import { User } from '../interfaces/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUserId(): number {
    return JSON.parse(localStorage.getItem('user')!).id;
  }

  getUserFormLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  getUserRole(): string {
    return JSON.parse(localStorage.getItem('user')!).role;
  }
}
