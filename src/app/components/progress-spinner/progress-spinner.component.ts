import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-progress-spinner',
  imports: [
    MatProgressSpinnerModule
  ],
  templateUrl: './progress-spinner.component.html',
  styleUrl: './progress-spinner.component.css'
})
export class ProgressSpinnerComponent implements OnChanges {
  @Input("show") show: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["show"]) {
      this.show = changes["show"].currentValue;
    }
  }
}
