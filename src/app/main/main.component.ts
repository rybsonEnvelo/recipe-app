import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from '../shared/enums/Role.enum';
import { ApiService } from '../shared/services/api.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent {
  public isAuthor = this.userService.getUserRoleFormLocalStorage() === Role.AUTHOR;

  constructor(private userService: UserService) {}
}
