
import { Injectable, signal } from '@angular/core';
import { SortField } from '../types/sort-field-type';
import { SortDirection } from '../types/sort-direction-type copy';

export interface SortOption {
  field: SortField;
  direction: SortDirection;
}

@Injectable({
  providedIn: 'root'
})
export class RequestStoreService {
  sortOptions = signal<SortOption[]>([{ field: 'id', direction: 'desc' }]);

  setSortOptions(options: SortOption[]) {
    this.sortOptions.set(options);
  }

  getSortParams(): string[] {
    return this.sortOptions().map(opt => `${opt.field},${opt.direction}`);
  }
}
