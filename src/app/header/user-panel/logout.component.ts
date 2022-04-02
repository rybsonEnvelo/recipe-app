import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class UserPanelComponent {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  logOutUser() {
    this.authService.logOutUser();
  }
}
