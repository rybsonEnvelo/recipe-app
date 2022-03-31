import { Component, OnInit } from '@angular/core';
import { ShareService } from '../shared/services/share.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit {
  recipe$ = this.shareService.captureRecipe();

  constructor(private shareService: ShareService) {}

  ngOnInit(): void {}
}
