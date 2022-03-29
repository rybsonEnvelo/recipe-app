import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../interfaces/Recipe';
import { ShareService } from '../shared/share.service';

@Component({
  selector: 'app-recipe-tile',
  templateUrl: './recipe-tile.component.html',
  styleUrls: ['./recipe-tile.component.scss'],
})
export class RecipeTileComponent implements OnInit {
  @Input() recipe!: Recipe;

  constructor(private shareService: ShareService) {}

  ngOnInit(): void {}

  displayDetails() {
    this.shareService.emitRecipe(this.recipe);
  }
}
