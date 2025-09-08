import { Component, Output, EventEmitter } from '@angular/core';
import { RequestStoreService, SortOption } from '../../services/request-store-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SortField } from '../../types/sort-field-type';

const FIELD_LABELS: Record<SortField, string> = {
  id: 'Time of Creation',
  title: 'Title',
  description: 'Description',
  status: 'Status',
  priority: 'Priority',
};

@Component({
  selector: 'app-sort-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sort-form.html',
  styleUrl: './sort-form.css'
})
export class SortForm {
  @Output() close = new EventEmitter<void>();

  availableFields: SortField[] = ['id', 'title', 'description', 'status', 'priority'];
  fieldLabels = FIELD_LABELS;

  sortOptions: SortOption[] = [];

  constructor(private requestStore: RequestStoreService) {
    this.sortOptions = [...this.requestStore.sortOptions()];
  }

  isFieldDisabled(field: SortField, idx: number): boolean {
    return this.sortOptions.some((o, i) => o.field === field && i !== idx);
  }

  addSortField() {
    const used = this.sortOptions.map(opt => opt.field);
    const next = this.availableFields.find(f => !used.includes(f));
    if (next) {
      this.sortOptions.push({ field: next, direction: 'asc' });
    }
  }

  removeSortField(idx: number) {
    this.sortOptions.splice(idx, 1);
  }

  moveSortField(idx: number, dir: -1 | 1) {
    const newIdx = idx + dir;
    if (newIdx < 0 || newIdx >= this.sortOptions.length) return;
    const [item] = this.sortOptions.splice(idx, 1);
    this.sortOptions.splice(newIdx, 0, item);
  }

  save() {
    this.requestStore.setSortOptions([...this.sortOptions]);
    this.close.emit();
  }

  cancel() {
    this.close.emit();
  }
}
