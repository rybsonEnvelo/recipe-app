import { Component, Input } from '@angular/core';
import { Recipe } from '../shared/interfaces/Recipe';
import { ShareService } from '../recipe-details/share.service';

@Component({
  selector: 'app-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss'],
})
export class RecipeTileComponent {
  @Input() recipe!: Recipe;

  constructor(private shareService: ShareService) {}

  displayDetails() {
    this.shareService.emitRecipe(this.recipe);
  }
}
