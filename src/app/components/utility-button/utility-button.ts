import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-utility-button',
  imports: [],
  templateUrl: './utility-button.html',
  styleUrl: './utility-button.css'
})
export class UtilityButton {
  @Input() googleSymbol!: string;
  @Input() label!: string;
}
