import { Component, OnInit } from '@angular/core';
import { SortOption } from '../interfaces/SortOption';
import { SortService } from './sort.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss'],
})
export class RecipeListComponent implements OnInit {
  sortOptions: SortOption[] = this.sortService.getSortOptions();

  constructor(private sortService: SortService) {}

  ngOnInit(): void {}
}
