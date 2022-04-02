import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { tap } from 'rxjs';
import { Recipe } from '../shared/interfaces/Recipe';
import { SortOption } from '../shared/interfaces/SortOption';
import { RecipeListService } from './recipe-list.service';
import { SortService } from './sort.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  sortOptions: SortOption[] = this.sortService.getSortOptions();
  recipes: Recipe[] = [];
  filterForm!: FormGroup;

  constructor(
    private sortService: SortService,
    private RecipeListService: RecipeListService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.RecipeListService.recipes$.subscribe((result) => (this.recipes = result));
  }

  createForm() {
    this.filterForm = this.formBuilder.group({
      search: [''],
      select: [null],
    });
  }
}
