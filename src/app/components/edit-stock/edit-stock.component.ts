import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StockService } from '../../core/stocks/stock.service';
import { Stock } from '../../core/stocks/stock';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-stock',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './edit-stock.component.html',
  styleUrl: './edit-stock.component.css'
})
export class EditStockComponent implements OnInit {
  stockForm = new FormBuilder().nonNullable.group<Stock>({
    id: 0,
    name: "",
    quantity: 0,
    mount: 0
  });

  readonly stockService = inject(StockService);
  readonly router = inject(Router);
  readonly activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (value) => {
        this.stockService.getStock(value["id"]).subscribe({
          next: (res) => {
            this.stockForm.patchValue(res);
          }
        });
      }
    });
  }

  editStock() {
    this.stockService.editStock(this.stockForm.get("id")?.value as number, this.stockForm.value as Stock).subscribe({
      next: (res) => {
        this.router.navigate(["/administrator"]);
      }
    });
  }
}
