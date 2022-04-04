import { Injectable } from '@angular/core';
import { SortOption } from '../../shared/interfaces/SortOption.model';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  public getSortOptions(): SortOption[] {
    return [
      {
        label: 'Sortuj',
        value: null,
      },
      {
        label: 'Nazwa A-Z',
        value: 'name,asc',
      },
      {
        label: 'Nazwa Z-A',
        value: 'name,desc',
      },
      {
        label: 'Ocena 0-5',
        value: 'rate,asc',
      },
      {
        label: 'Ocena 5-0',
        value: 'rate,desc',
      },
    ];
  }
}
