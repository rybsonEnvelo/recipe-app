import { Component } from '@angular/core';
import { Role } from '../shared/enums/Role.enum';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  constructor(private userService: UserService) {}

  isAuthor() {
    return this.userService.getUserRoleFormLocalStorage() === Role.AUTHOR;
  }
}
