import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-info-card',
  imports: [
    MatCardModule
  ],
  templateUrl: './info-card.component.html',
  styleUrl: './info-card.component.css'
})
export class InfoCardComponent implements OnChanges {
  @Input() value: number | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["value"]) {
      this.value = changes["value"].currentValue;
    }
  }
}
