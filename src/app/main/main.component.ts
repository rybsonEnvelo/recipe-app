import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsService } from '../recipe/recipe-details/details.service';
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

  constructor(private userService: UserService, private detailsService: DetailsService, private router: Router) {}

  ngOnInit(): void {
    this.detailsService.recipe$.subscribe((recipe) => {
      recipe ? (this.currentRecipeId = recipe.id!) : this.router.navigate(['main']);
    });
  }
}
