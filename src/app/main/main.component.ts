import { Component, OnInit } from '@angular/core';
import { ShareService } from '../recipe/recipe-details/details.service';
import { Role } from '../shared/enums/Role.enum';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public currentRecipeId!: number;
  public isAuthor = this.userService.getUserRoleFormLocalStorage() === Role.AUTHOR;

  constructor(private userService: UserService, private shareService: ShareService) {}

  ngOnInit(): void {
    this.shareService.recipe$.subscribe((recipe) => {
      this.currentRecipeId = recipe.id!;
    });
  }
}
