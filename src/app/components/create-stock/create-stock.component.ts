import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StockService } from '../../core/stocks/stock.service';
import { Stock } from '../../core/stocks/stock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-stock',
  imports: [
    ReactiveFormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule, 
  ],
  templateUrl: './create-stock.component.html',
  styleUrl: './create-stock.component.css'
})
export class CreateStockComponent {
  stockForm = new FormBuilder().nonNullable.group<Stock>({
    id: 0,
    name: "",
    quantity: 0,
    mount: 0
  });

  readonly stockService = inject(StockService);
  readonly router = inject(Router);

  createStock() {
    this.stockService.createStock(this.stockForm.value as Stock).subscribe({
      next: (res) => {
        this.router.navigate(["/administrator"]);
      }
    });
  }
}
