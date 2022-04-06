import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounce, Subscription, tap, timer } from 'rxjs';
import { Recipe } from '../../shared/interfaces/Recipe.model';
import { SortOption } from '../../shared/interfaces/SortOption.model';
import { RecipeListService } from './recipe-list.service';
import { SortService } from './sort.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  public sortOptions: SortOption[] = this.sortService.getSortOptions();
  public recipes: Recipe[] = [];
  public filterForm!: FormGroup;
  private listSubscription!: Subscription;

  constructor(
    private sortService: SortService,
    private recipeListService: RecipeListService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.listSubscription = this.recipeListService.recipes$.subscribe((result) => (this.recipes = result));
    this.filterForm.get('select')!.valueChanges.subscribe((string) => this.recipeListService.filterRecipe(string));
    this.filterForm
      .get('search')!
      .valueChanges.pipe(debounce(() => timer(300)))
      .subscribe((input) => this.recipeListService.searchRecipe(input));
  }

  ngOnDestroy(): void {
    this.listSubscription.unsubscribe();
  }

  createForm() {
    this.filterForm = this.formBuilder.group({
      search: [''],
      select: [null],
    });
  }
}
