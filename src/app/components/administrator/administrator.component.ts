import { Component, OnInit } from '@angular/core';
import { StocksTableComponent } from '../stocks-table/stocks-table.component';
import { Stock } from '../../core/stocks/stock';
import { StockService } from '../../core/stocks/stock.service';
import { forkJoin } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-administrator',
  imports: [
    StocksTableComponent,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './administrator.component.html',
  styleUrl: './administrator.component.css'
})
export class AdministratorComponent implements OnInit {
  stocks: Stock[] = [];

  constructor(
    private readonly stockService: StockService,
  ) { }

  ngOnInit(): void {
    forkJoin({
      stocks: this.stockService.getAllStocks()
    }).subscribe({
      next: (responses) => {
        this.stocks = responses.stocks;
      }
    });
  }

  deleteStock(id: number) {
    this.stockService.deleteStock(id).subscribe({
      next: (res) => {
        this.stockService.getAllStocks().subscribe({
          next: (res) => {
            this.stocks = res;
          }
        });
      }
    });
  }
}
