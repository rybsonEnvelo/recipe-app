import { Injectable } from '@angular/core';
import { SortOption } from '../interfaces/SortOption';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  getSortOptions(): SortOption[] {
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
