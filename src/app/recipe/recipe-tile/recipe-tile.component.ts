import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Recipe } from '../../shared/interfaces/Recipe.model';
import { DetailsService } from '../recipe-details/details.service';

@Component({
  selector: 'app-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss'],
})
export class RecipeTileComponent {
  @Input() recipe!: Recipe;

  constructor(private shareService: DetailsService, private router: Router) {}

  displayDetails() {
    this.shareService.emitRecipe(this.recipe);
    this.router.navigate(['main/details', this.recipe.id]);
  }
}
