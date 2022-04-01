import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Recipe } from '../interfaces/Recipe';
import { SortOption } from '../interfaces/SortOption';
import { RecipeService } from './recipe.service';
import { SortService } from './sort.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  sortOptions: SortOption[] = this.sortService.getSortOptions();
  recipes: Recipe[] = [];

  constructor(private sortService: SortService, private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.recipes$.subscribe((result) => (this.recipes = result));
  }
}
