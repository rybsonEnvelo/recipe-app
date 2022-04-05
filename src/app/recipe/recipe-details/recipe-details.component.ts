import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShareService } from './details.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
})
export class RecipeDetailsComponent implements OnInit, OnDestroy {
  public recipe$ = this.shareService.recipe$;
  private recipeSubscription!: Subscription;

  constructor(private shareService: ShareService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.recipeSubscription = this.shareService.getSingleRecipe(id);
    }
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
