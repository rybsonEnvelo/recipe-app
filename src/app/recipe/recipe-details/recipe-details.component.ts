import { Component } from '@angular/core';
import { ShareService } from './share.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent {
  public recipe$ = this.shareService.recipe$;

  constructor(private shareService: ShareService) {}
}
