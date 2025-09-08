
import { Component, Output, EventEmitter } from '@angular/core';
import { RequestStoreService } from '../../services/request-store-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-page-size-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './page-size-form.html',
  styleUrl: './page-size-form.css'
})
export class PageSizeForm {
  @Output() close = new EventEmitter<void>();

  pageSizes = [5, 10, 20];
  selected: number;

  constructor(private requestStore: RequestStoreService) {
    this.selected = this.requestStore.pageSize();
  }

  onChange(size: number) {
    this.selected = size;
  }

  save() {
    this.requestStore.setPageSize(this.selected);
    this.close.emit();
  }

  cancel() {
    this.close.emit();
  }
}
