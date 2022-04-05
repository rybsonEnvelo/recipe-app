import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Role } from '../enums/Role.enum';
import { User } from '../interfaces/User.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<User | null>(null);

  get user$() {
    return this.user.asObservable();
  }

  constructor() {
    this.emitUser(this.getUserFormLocalStorage());
  }

  emitUser(user: User | null) {
    this.user.next(user);
  }

  getUserIdFormLocalStorage(): number {
    return JSON.parse(localStorage.getItem('user')!).id;
  }

  getUserFormLocalStorage(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  getUserRoleFormLocalStorage(): string {
    return JSON.parse(localStorage.getItem('user')!).role;
  }

  removeUserFromLocalStorage() {
    localStorage.removeItem('user');
  }
}
