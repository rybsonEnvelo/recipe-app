import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap, take } from 'rxjs';
import { UserService } from 'src/app/shared/services/user.service';
import { RecipeListService } from '../recipe-list/recipe-list.service';
import { DetailsService } from './details.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  public recipe$ = this.shareService.recipe$;
  public userRole = this.userService.getUserRoleFormLocalStorage();
  private recipeSubscription!: Subscription;

  constructor(
    private shareService: DetailsService,
    private route: ActivatedRoute,
    private recipeListService: RecipeListService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.recipeSubscription = this.shareService.getSingleRecipe(id);
    }
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

  removeRecipe(id: number) {
    this.recipeListService.removeRecipe(id);
  }
}
