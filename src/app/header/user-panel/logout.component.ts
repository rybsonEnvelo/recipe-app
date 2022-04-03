import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class UserPanelComponent {
  constructor(private authService: AuthService) {}

  logOutUser() {
    this.authService.logOutUser();
  }
}
